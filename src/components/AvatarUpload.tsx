import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Camera, Loader2 } from 'lucide-react';

export function AvatarUpload() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error loading profile:', error);
            }

            if (data?.avatar_url) {
                setAvatarUrl(data.avatar_url);
            } else {
                setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}&backgroundColor=1e293b`);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setUploading(true);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user');

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // Update user profile
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ id: user.id, avatar_url: publicUrl, updated_at: new Date().toISOString() });

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(publicUrl);
        } catch (error: any) {
            alert(error.message || 'Erro ao fazer upload da imagem!');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="h-10 w-10 rounded-full bg-[var(--color-surface-light)] border-2 border-[var(--color-primary)]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[var(--color-primary)]">
                {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)]" />
                ) : (
                    <img
                        src={avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Casal&backgroundColor=1e293b"}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={14} className="text-white" />
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
            />
        </div>
    );
}

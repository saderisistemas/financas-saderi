import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function askFinancialCoach(prompt: string, context?: any) {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
        return "Ei, parece que a chave da IA não está configurada corretamente no seu .env.";
    }

    const systemMessage = `
    Você é o Coach Financeiro de Resgate da Família Saderi.
    ATENÇÃO: A família está MUITO no vermelho, super endividada e NÃO possui cartão de crédito (usam só Pix/Débito).
    A missão principal de vocês é CORTAR GASTOS DESNECESSÁRIOS para sair das dívidas (Efeito Bola de Neve).
    A regra sagrada deles agora é a Sobrevivência: Se não tem o dinheiro no saldo hoje, não se compra.
    
    Contexto Financeiro Atual: ${JSON.stringify(context || {})}
    
    Responda SEMPRE de forma extremamente curta (máx 3 frases), pragmática, um firme mas comemorando como louco qualquer pequeno corte de gastos ou economia.
    Seja o "Comandante de Resgate" deles.
  `;

    try {
        const result = await model.generateContent([
            { text: systemMessage },
            { text: `Usuário diz: ${prompt}` }
        ]);

        return result.response.text();
    } catch (error) {
        console.error("AI Erro:", error);
        return "Tive uma falha de conexão agora, mas respire fundo e não gaste esse dinheiro por enquanto.";
    }
}

export async function categorizeExpenseAI(description: string) {
    const prompt = `
    Dada a descrição do gasto: "${description}", retorne APENAS um JSON válido com esta estrutura exata:
    {"category": "Essencial" | "Lazer" | "Dívida", "is_essential": boolean}
    Regras: Supermercado e Contas = Essencial. Delivery, saídas, apps = Lazer.
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch {
        return { category: "Outro", is_essential: false };
    }
}

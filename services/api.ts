
const API_URL = 'https://n8n.bambyno.xyz/webhook-test/newspkp';

interface ApiResponse {
  response?: string;
  reply?: string;
  message?: string;
  text?: string;
}

export const postMessage = async (session: string, message: string): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session, message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur réseau: ${response.status} ${response.statusText}. Détails: ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data: ApiResponse | any = await response.json();

      if (typeof data === 'object' && data !== null) {
          const reply = data.response || data.reply || data.message || data.text;
          if (typeof reply === 'string') {
              return reply;
          }
          // Fallback for differently structured JSON
          const firstStringValue = Object.values(data).find(v => typeof v === 'string');
          // FIX: Use a `typeof` check to properly narrow the type to string.
          if (typeof firstStringValue === 'string') {
              return firstStringValue;
          }
      }

      throw new Error("La réponse de l'API JSON est mal formatée ou ne contient pas de message textuel.");
    } else {
      const textData = await response.text();
      if (textData) {
        return textData;
      }
      throw new Error("La réponse de l'API n'est pas au format JSON et est vide.");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    if (error instanceof Error) {
        return `Désolé, une erreur est survenue lors de la communication avec le serveur: ${error.message}`;
    }
    return "Désolé, une erreur inconnue est survenue.";
  }
};

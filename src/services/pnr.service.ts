import axios from 'axios';

export const fetchPnrStatus = async (pnrNumber: string) => {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-GB,en;q=0.9',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'referer': 'https://www.redbus.in/',
      'origin': 'https://www.redbus.in',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
    };

    // Try direct request first
    const directUrl = `https://www.redbus.in/railways/api/getPnrData?pnrno=${pnrNumber}`;
    
    try {
      const directResponse = await axios.get(directUrl, { headers });
      return directResponse.data;
    } catch (directError) {
      console.log('Direct request failed, trying backup method...');
      
      // If direct request fails, try with a proxy
      if (!process.env.PROXY_API_KEY) {
        throw new Error('Proxy API key not configured');
      }

      const proxyUrl = `https://proxy.scrapeops.io/v1/?api_key=${process.env.PROXY_API_KEY}&url=${directUrl}`;
      const proxyResponse = await axios.get(proxyUrl, {
        // headers,
        timeout: 10000
      });

      return proxyResponse.data;
    }
  } catch (error) {

    let message = error as Error;
    console.error('PNR fetch error:', message?.message || message);
    
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status || 500,
        message: error.response?.status === 403 
          ? 'Access denied. Please try again later.'
          : 'Unable to fetch PNR status at this moment',
        error: error.message
      };
    }

    throw {
      status: 500,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
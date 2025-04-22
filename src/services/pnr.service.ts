import axios from 'axios';

export const fetchPnrStatus = async (pnrNumber: string) => {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-GB,en;q=0.9',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      'referer': `https://www.redbus.in/railways/pnrStatusDetails?pnrNo=${pnrNumber}`,
      'origin': 'https://www.redbus.in',
    };

    const url = `https://www.redbus.in/railways/api/getPnrData?pnrno=${pnrNumber}`;

    const config = {
      method: 'get',
      url: url,
      headers: headers,
      timeout: 5000, // 5 second timeout
    };

    const response = await axios.request(config);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching PNR status:', {
        status: error.response?.status,
        message: error.message
      });
      
      throw {
        status: error.response?.status || 500,
        message: 'Unable to fetch PNR status at this moment',
        error: error.message
      };
    }
    throw error;
  }
};
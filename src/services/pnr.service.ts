import axios from 'axios';

export const fetchPnrStatus = async (pnrNumber: string) => {

  const headers = { 
    'accept': '*/*', 
    'accept-language': 'en-GB,en;q=0.9', 
    'priority': 'u=1, i', 
    'referer': `https://www.redbus.in/railways/pnrStatusDetails?pnrNo=${pnrNumber}&from=PNR%20Home%20Dweb`, 
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"macOS"', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-origin', 
    'sec-gpc': '1', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 
    'Cookie': 'rbuuid=3caa3d00-1ebc-11f0-9afa-9d6c5002875d; userSessionId=ID_y4nuhdqb4; userSessionCookie=3caa3d01-1ebc-11f0-9afa-9d6c5002875d; mriBrowserFPSet=false; mriClientId=WD3caa6410-1ebc-11f0-9afa-9d6c5002875d; mriSessionId=WD3caa6410-1ebc-11f0-9afa-9d6c5002875d; mriClientIdSetDate=Mon%20Apr%2021%202025%2014%3A23%3A46%20GMT%2B0000%20(Coordinated%20Universal%20Time); country=IND; currency=INR; defaultlanguage=en; language=en; bm_sz=9CFA96A66AF1C90298AFAEA06649D922~YAAQzpUvF3s7u0KWAQAANNW7WBu7fiGTATh6qpYKfmjq3lz4A/IHhuOgcgA9fU21NRaGtWP4MwoloG3/eDDeZXOyvDi97DVW/BPA7o4qqV0wsfFvHODP7SMiF2ATS0c03DRmwRxjYYCDkrEu+LrtwR52TnoiiIyQmZP2j92l6n9OcX9tQIJLB6WzsT9AuFf3QaoUxZ22VzoRHL9T/ZlsA0+5HF8TVuikjfktv6jWti1YSWF51M8gnkS0gv8pjWzlGiMVDhjn/byyiZ+OY2+woVtPRxEccSck47wFyXSZZyRPwNmn0B2UAmHeRA68mVRpOA51m17nj8AKTYR3QXfEk5FZ8GLa9fYuHpfopWD4AdVWvHAfDv4F8tvTfHVPOTvTfRLoB5QcgAadJQUL+Q==~3355718~4339009; isMoeEnabledRail=true; _abck=68117EE8AA57A5EC69D2339C3D5E4B6E~-1~YAAQzpUvF4k7u0KWAQAAMta7WA2/I1sHd9/3zmU22vnJuIm+XVmnOt2GRtZJMrOF9q+uFe4yceGPjKelQ6qpUsgdNS0EEU5dRCuKMmIx9xvHoSUOBMJQ4vRZoY//w1iBMFCTu38pI20rGHj5bIrNsUidfL5fX/NymgI/puvVwja+tRwyT4THbtGbBYJ9MTd6OGMLpQ7godaex7N49A4hVxASMTrO4ig7gTyIFYN9fLxEkKdJZiN2NWV83LtbJ8Fqt+FASVtTNXb5H2o7uJPiP1n+RQI8PASZGYmmvm4LnX9m1euV4DOhTJRRIwL/WmWn5x6Vba+/XEDChRPGpD4vF8E346wrsLVBFhF5jbDWQsMB5BEuQ9DrkNV5lWWWlIBh7qmpTs5JrSmbNoc2nYjuC9gWtNrj3u5xFQdJxnEer/hEY0vCUORl6e8CyPz9MIlSUpzf~-1~-1~-1; ak_bmsc=A5E08DCB69B6D2EDE5B5D04D82E8DB49~000000000000000000000000000000~YAAQzpUvF9E7u0KWAQAAb9u7WBt6xfxRsNVNiFxdFfr9/27wu3T+rwQMZq7Pr+7F/cavNzrKtT584Gs+T0TQDETFSYKvbrpW/PCkVmT9ZPkBmVyKCq8F9fncCoUlHChw3QtcQxwqh/RACurFVChPCCtruUN7LWSvuJGm45uyEnJSvnbh7QMKY1i+mRyTBbXf/dmlDnidmcIYgzNKN+zgHPDiff5vrkHF3ywsLfwSAM5jdpQLRtOrVaTPa1VIXZwsFhuzGbrNPgd7GNB7EJUlrIpAURQzpT3yKu0z3RJojpms/rhy8a1IoE+8Yph3kAzPNN7ThDyWdCL4j2J7IdbllBfVkRxQSEYHyWepHhpmwtTvlDohWilgeOikf6ghJodFm5VAzTkQZplrC4ZhJMQLRmSiI1fwYlMc+6CxSylrglfgb7RhTsno3lHmz/QgnBo53YxG; bm_sv=C81ADA48768E8FBA059E0F22D952C0CA~YAAQrTtAFzPUyVSWAQAASrrCWBsb1lFKMQc1RCNmdEeq47aM2h3QrZMy5LLzbsncsBT2LdrqqKcpnPexJO83S4D1EfhC80GOWFMeA/5EhIa92T85QLL6J68OUukhP9lHxuIjs+Sow4rlf3UkYkYDEsMITNYCxskHOkfx+vxQbpIhYNNyYEvvCtEkI4YO4FljMOQnNVluSO+N38lfyE6vtYOMziky9OjtP+qfRZ+/0FquwRUwteqEN0XApfFMJ1c=~1; bm_sv=C81ADA48768E8FBA059E0F22D952C0CA~YAAQrTtAF5dTy1SWAQAA9y3UWBs7m32NZlJnibHHhKi4Gaj6r7XZbyPry/TFqvjxhgWPR9zaXPRBt1l7CZPDlhomcOzt4p6uSwXB0Tm1BJFri9BnOdqXyCAp1K7+toCsEIAeWBhBy/3ERHVHNCC8tvCDL17iA0RuALSUZEeB+QYoY/Y1+l5lbkuQuBoWTsvIBzHOw+9AbUwEe851j6PQP+cecVYjBulk9I+q8E4PSkW93slPS/yPBY6h4rddrUc=~1'
  };

  const url = `https://www.redbus.in/railways/api/getPnrData?pnrno=${pnrNumber}`;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: headers,
  };

  const response = await axios.request(config);

  console.log('Response from redbus:', response.data);

  return response.data;
};
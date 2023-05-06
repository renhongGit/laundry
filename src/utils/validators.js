const customRules = {
  nameRules: {
    validate: value => {
      const regex = /^[\u4e00-\u9fa5]+$/; // 確認是否全為中文字
      const hasMrOrMs = value.includes('先生') || value.includes('小姐'); // 確認是否含有先生或小姐
      const isValidLength = value.trim().length >= 2 && value.trim().length <= 4; // 確認字元數是否在 2 到 4 之間
      return regex.test(value) && !hasMrOrMs && isValidLength;
    },
    getMessage: field => `${field} 格式不符合要求，請輸入 2 到 4 個中文字，且不含先生或小姐`,
  },
  telRules: {
    validate: value => {
      const regex = /^09\d{8}$/; // 確認開頭為 09，且後面為 8 位數字
      const isValidLength = value.trim().length === 10; // 確認長度為 10
      return regex.test(value) && isValidLength;
    },
    getMessage: field => `${field} 格式不符合要求，確認開頭為 09，且後面為 8 位數字`,
  },
  addressRules:{
    validate: value => {
      const regex = /^[\u4e00-\u9fa5\d]*$/; // 只允許中文和數字
      const isValidLength = value.trim().length >= 2; // 確認字元數是否大於等於2
      return regex.test(value) && isValidLength;
    },
    getMessage: field => `${field} 格式不符合要求，確認內容是否正確`,
    
  },
  messageRules:{
    validate: value => {
      if (value.trim() === '') return true; // 允許空值
    return value.trim().length <= 25;
    },
    getMessage: field => `${field} 留言請勿超過25個字 `,
    
  },
  lastfive: {
    validate: (value) => {
      return /^[0-9]+$/.test(value) && value.length >= 5;
    },
    getMessage: (field) => {
      return `${field} 請輸入數字`;
    },
  },
};


export default customRules;
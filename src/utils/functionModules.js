import { LoremIpsum } from "lorem-ipsum";

export default {
  add(a, b) {
    return a + b
  },

  getLorem() {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    const text = lorem.generateSentences(5);
    return text
  },
  // 对象数组转键值对
  convertArrayToKeyValuePairs(array) {
    // 使用 map() 方法遍历数组并转换每个元素
    const result = array.map(item => {
      // 获取所有属性的值，并将它们合并为一个字符串，用 "/" 分隔
      const combinedValue = Object.values(item).join('/');
      // 返回一个新对象，其 label 和 value 字段都设为合并后的字符串
      return {
        label: combinedValue,
        value: combinedValue
      };
    });
    // 将结果数组转换为 JSON 字符串
    return JSON.stringify(result, null, 2); // 使用缩进提高可读性
  },

   generateValues(arrData, extraFields = {}, fieldOrder = null) {
    // 转义SQL字符串的函数
    const escapeSqlString = value => {
        if (typeof value === 'string') {
            return value.replace(/'/g, "''");
        }
        return value;
    };

    // 先给每个对象添加额外的字段
    const dataWithExtras = arrData.map(item => ({
        ...item,
        ...extraFields
    }));

    // 处理每个对象，如果提供了fieldOrder则按照其顺序提取字段，否则按照对象键的默认顺序
    const values = dataWithExtras.map(row => {
        const fieldsToUse = fieldOrder || Object.keys(row);
        const rowValues = fieldsToUse.map(field => {
            const value = row[field] === undefined ? '' : row[field];
            return `'${escapeSqlString(value)}'`;
        });
        return '(' + rowValues.join(', ') + ')';
    }).join(',\n');

    return values;
},
extraFields:{
  year: "2024-01-01",
  month: "2024-01-01"
},

modelList:[
  {
    "id": "gpt-3.5-turbo-16k",
    "object": "model",
    "created": 1683758102,
    "owned_by": "openai-internal"
  },
  {
    "id": "gpt-3.5-turbo-16k-0613",
    "object": "model",
    "created": 1685474247,
    "owned_by": "openai"
  },
  {
    "id": "whisper-1",
    "object": "model",
    "created": 1677532384,
    "owned_by": "openai-internal"
  },
  {
    "id": "davinci-002",
    "object": "model",
    "created": 1692634301,
    "owned_by": "system"
  },
  {
    "id": "gpt-3.5-turbo",
    "object": "model",
    "created": 1677610602,
    "owned_by": "openai"
  },
  {
    "id": "dall-e-2",
    "object": "model",
    "created": 1698798177,
    "owned_by": "system"
  },
  {
    "id": "tts-1-hd-1106",
    "object": "model",
    "created": 1699053533,
    "owned_by": "system"
  },
  {
    "id": "tts-1-hd",
    "object": "model",
    "created": 1699046015,
    "owned_by": "system"
  },
  {
    "id": "gpt-4-0613",
    "object": "model",
    "created": 1686588896,
    "owned_by": "openai"
  },
  {
    "id": "gpt-4",
    "object": "model",
    "created": 1687882411,
    "owned_by": "openai"
  },
  {
    "id": "text-embedding-3-large",
    "object": "model",
    "created": 1705953180,
    "owned_by": "system"
  },
  {
    "id": "gpt-4-1106-vision-preview",
    "object": "model",
    "created": 1711473033,
    "owned_by": "system"
  },
  {
    "id": "gpt-3.5-turbo-instruct-0914",
    "object": "model",
    "created": 1694122472,
    "owned_by": "system"
  },
  {
    "id": "gpt-3.5-turbo-instruct",
    "object": "model",
    "created": 1692901427,
    "owned_by": "system"
  },
  {
    "id": "gpt-3.5-turbo-0301",
    "object": "model",
    "created": 1677649963,
    "owned_by": "openai"
  },
  {
    "id": "gpt-3.5-turbo-0613",
    "object": "model",
    "created": 1686587434,
    "owned_by": "openai"
  },
  {
    "id": "tts-1",
    "object": "model",
    "created": 1681940951,
    "owned_by": "openai-internal"
  },
  {
    "id": "dall-e-3",
    "object": "model",
    "created": 1698785189,
    "owned_by": "system"
  },
  {
    "id": "gpt-4-1106-preview",
    "object": "model",
    "created": 1698957206,
    "owned_by": "system"
  },
  {
    "id": "gpt-3.5-turbo-1106",
    "object": "model",
    "created": 1698959748,
    "owned_by": "system"
  },
  {
    "id": "babbage-002",
    "object": "model",
    "created": 1692634615,
    "owned_by": "system"
  },
  {
    "id": "tts-1-1106",
    "object": "model",
    "created": 1699053241,
    "owned_by": "system"
  },
  {
    "id": "gpt-4-vision-preview",
    "object": "model",
    "created": 1698894917,
    "owned_by": "system"
  },
  {
    "id": "text-embedding-3-small",
    "object": "model",
    "created": 1705948997,
    "owned_by": "system"
  },
  {
    "id": "text-embedding-ada-002",
    "object": "model",
    "created": 1671217299,
    "owned_by": "openai-internal"
  },
  {
    "id": "gpt-3.5-turbo-0125",
    "object": "model",
    "created": 1706048358,
    "owned_by": "system"
  },
  {
    "id": "gpt-4-0125-preview",
    "object": "model",
    "created": 1706037612,
    "owned_by": "system"
  },
  {
    "id": "gpt-4-turbo-preview",
    "object": "model",
    "created": 1706037777,
    "owned_by": "system"
  }
]

}







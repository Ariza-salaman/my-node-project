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
}

}



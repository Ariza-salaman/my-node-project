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
  // 生成SQL插入语句的VALUES部分
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
  // 将数据库数据转换为嵌套的自增表格数据
  transformData(data) {
    // 创建一个映射，将每个uuid映射到其详细信息
    const idMap = data.reduce((acc, item) => {
      acc[item.uuid] = { ...item, children: [] };
      return acc;
    }, {});

    // 构建树状结构
    let root = [];
    data.forEach(item => {
      if (item.parentID) {
        idMap[item.parentID].children.push(idMap[item.uuid]);
      } else {
        root.push(idMap[item.uuid]);
      }
    });

    // 递归构建每个级别的表结构
    function buildTable(node, level) {
      if (!node || level > 5) return null;
      const levelName = `level${level}`;
      const tableName = `level${level + 1}Table`;
      const nextLevel = level + 1;

      const result = {
        [`uuid`]: node.uuid,
        [`isRoot`]: node.isRoot,
        [`${levelName}`]: node.description
      };

      if (node.children.length > 0) {
        result[tableName] = node.children.map(child => buildTable(child, nextLevel));
      }

      return result;
    }

    // 创建最终结构
    return root.map(item => ({
      failKpiName: item.fail_kpi_name,
      level1Table: buildTable(item, 1) ? [buildTable(item, 1)] : []
    }));
  }
}







import { UUID } from "uuidjs";
import { LoremIpsum } from "lorem-ipsum";

import _ from 'lodash';

function getSqlValues() {
  const data = {
    "reasonCard": [
      {
        "level1Table": [
          {
            "isRoot": false,
            "level2Table": [
              {
                "isRoot": false,
                "level3Table": [
                  {
                    "isRoot": false,
                    "level4Table": [
                      {
                        "isRoot": false,
                        "level5Table": [
                          {
                            "isRoot": false,
                            "level5": "voluptate tempor labore"
                          }
                        ],
                        "level4": "voluptate tempor labore"
                      }
                    ],
                    "level3": "voluptate tempor labore"
                  }
                ],
                "level2": "voluptate tempor labore"
              }
            ],
            "level1": "voluptate tempor labore"
          }
        ],
        "failKpiName": "voluptate tempor labore"
      },
      {
        "level1Table": [
          {
            "isRoot": false,
            "level2Table": [
              {
                "isRoot": false,
                "level3Table": [],
                "level2": "voluptate tempor labore"
              }
            ],
            "level1": "voluptate tempor labore"
          }
        ],
        "failKpiName": "voluptate tempor labore"
      }
    ]
  }; // 确保 formily1 和 global 对象已经定义
  const user = 'cheng';

  function buildValues(data, parentId = null, level = 1, reasonId = null, failKpiName) {
    let values = [];
    data.forEach((item) => {
      const uuid = (level === 1) ? reasonId : UUID.generate(); // 使用平台特定的 UUID 生成函数
      const isRoot = item.isRoot ? 'TRUE' : 'FALSE';
      const description = item[`level${level}`].replace(/'/g, "''");
      const valueString = `('${failKpiName}', '${uuid}', ${level}, '${description}', ${parentId ? `'${parentId}'` : 'NULL'}, ${isRoot}, '${user}', '${user}')`;
      values.push(valueString);

      // 处理嵌套表
      const nextLevelKey = `level${level + 1}Table`;
      if (item[nextLevelKey]) {
        values = values.concat(buildValues(item[nextLevelKey], uuid, level + 1, null, failKpiName));
      }
    });
    return values;
  }

  function generateSQL() {
    let sqlStatements = [];
    data.reasonCard.forEach(card => {
      const reasonId = UUID.generate(); // 使用平台特定的 UUID 生成函数
      const failKpiName = card.failKpiName;  // 获取 failKpiName 字段
      const reasonValues = buildValues(card.level1Table, null, 1, reasonId, failKpiName);
      sqlStatements.push(reasonValues.join(', \n'));
    });
    return sqlStatements.join(', \n'); // 正确地使用逗号分隔所有 SQL 语句
  }

  const result = generateSQL();
  // ......一些代码

  return result;
}

function add(a, b) {
  return a + b
}


function getLorem() {
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
}

function loopArr() {
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ];

  const filteredUsers = _.filter(users, (user) => user.active);
  console.log(filteredUsers);
  // 输出：[{'user': 'barney', 'age': 36, 'active': true}, {'user': 'pebbles', 'age': 1, 'active': true}]

}
export { getSqlValues, getLorem, add, loopArr }
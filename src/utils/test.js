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

function setElementVisiable() {
  if (!getKPIstatusView.data[0]) {
    kpiName1.setVisibility(false)
    kpi1.setVisibility(false)
    trend1.setVisibility(false)
    aop1.setVisibility(false)
  } else if (!getKPIstatusView.data[1]) {
    kpiName2.setVisibility(false)
    kpi2.setVisibility(false)
    trend2.setVisibility(false)
    aop2.setVisibility(false)
  } else if (!getKPIstatusView.data[2]) {
    kpiName3.setVisibility(false)
    kpi3.setVisibility(false)
    trend3.setVisibility(false)
    aop3.setVisibility(false)
  } else if (!getKPIstatusView.data[3]) {
    kpiName4.setVisibility(false)
    kpi4.setVisibility(false)
    trend4.setVisibility(false)
    aop4.setVisibility(false)
  } else if (!getKPIstatusView.data[4]) {
    kpiName5.setVisibility(false)
    kpi5.setVisibility(false)
    trend5.setVisibility(false)
    aop5.setVisibility(false)
  }
}
function calculatePeriod(statistical_period, yearMonth) {
  const inputDate = new Date(yearMonth + '-01');
  const startOfYear = new Date(inputDate.getFullYear(), 11, 1);  // 11是12月

  if (inputDate.getMonth() < 11) {
      startOfYear.setFullYear(startOfYear.getFullYear() - 1);
  }

  const monthsDifference = (inputDate.getFullYear() - startOfYear.getFullYear()) * 12 + (inputDate.getMonth() - startOfYear.getMonth());

  const MONAT = Math.floor((monthsDifference) / statistical_period) + 1;

  const startPeriodDate = new Date(startOfYear.getFullYear(), startOfYear.getMonth() + (MONAT - 1) * statistical_period, 1);
  const endPeriodDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth() + statistical_period, 0);

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  return {
      MONAT,
      startDate: formatDate(startPeriodDate),
      endDate: formatDate(endPeriodDate)
  };
}

function generateValues(data) {
  const user = 'cheng.zhou';  
  const filteredData = data.filter(row => 
                                   Object.values(row).some(value => value !== '' && value !== null)
                                  );
  const values = filteredData.map(row => {
    // 添加额外的字段
    const extendedRow = {
      ...row,
      create_user: user,
      modify_user: user,
    };
    return '(' + Object.values(extendedRow).map(value => `'${value}'`).join(', ') + ')';
  }).join(',\n');

  return values;
}

function isPrime(num) {
  // 质数必须大于1
  if (num <= 1) {
    return false;
  }
  // 2和3都是质数
  if (num === 2 || num === 3) {
    return true;
  }
  // 如果可以被2或3整除，则不是质数
  if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }
  // 检查除了2和3以外的奇数是否能整除
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}


const num = 2 ** 74207281 -1;
console.log(isPrime(num));


































export { getSqlValues, getLorem, add, loopArr, setElementVisiable,generateValues, calculatePeriod }
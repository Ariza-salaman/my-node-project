
console.log('Script loaded successfully!');

function getRandomHexColor() {
  // 生成一个随机整数
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // 将给定的数值转换为两位十六进制字符串
  function intToHex(int) {
    const hex = int.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  // 生成红、绿、蓝三个颜色分量的随机数值
  const red = getRandomInt(256);
  const green = getRandomInt(256);
  const blue = getRandomInt(256);

  // 转换为十六进制并返回最终的颜色码
  return '#' + intToHex(red) + intToHex(green) + intToHex(blue);
}

const btn = document.querySelector('.buttonClass')

btn.addEventListener('click', function () {
  const h1 = document.querySelector('h1')
  h1.style.color = getRandomHexColor()
})

const data = [
  {
    "uuid": "0c004535-0225-4cb9-8052-537bb7f480c9",
    "fail_kpi_name": "fail kpi reason 2",
    "level": 3,
    "description": "lorem33",
    "parentID": "e9d86587-97a4-4848-8153-c3d31b3bc9ad",
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:03:57Z"
  },
  {
    "uuid": "30655bf3-1015-400a-82cb-3b9e279d72ce",
    "fail_kpi_name": "fail kpi reason 2",
    "level": 1,
    "description": "lorem11",
    "parentID": null,
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:03:57Z"
  },
  {
    "uuid": "3b45481b-e5a9-4a3a-b9d4-2802952a800e",
    "fail_kpi_name": "fail kpi reason 1",
    "level": 2,
    "description": "lorem2",
    "parentID": "9ad9c9e3-3eb6-49bf-b98d-1645fa08d314",
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:03:58Z"
  },
  {
    "uuid": "541b54e8-91b2-41c5-b82d-48a9ff722305",
    "fail_kpi_name": "fail kpi reason 1",
    "level": 4,
    "description": "lorem4",
    "parentID": "62e575a3-9a5c-4673-94e4-61943459bb93",
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:03:59Z"
  },
  {
    "uuid": "62e575a3-9a5c-4673-94e4-61943459bb93",
    "fail_kpi_name": "fail kpi reason 1",
    "level": 3,
    "description": "lorem3",
    "parentID": "3b45481b-e5a9-4a3a-b9d4-2802952a800e",
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:03:59Z"
  },
  {
    "uuid": "9ad9c9e3-3eb6-49bf-b98d-1645fa08d314",
    "fail_kpi_name": "fail kpi reason 1",
    "level": 1,
    "description": "lorem1",
    "parentID": null,
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:04:00Z"
  },
  {
    "uuid": "d9124275-0dea-4930-b33c-4fe97d415819",
    "fail_kpi_name": "fail kpi reason 2",
    "level": 5,
    "description": "lorem55",
    "parentID": "eb842975-9997-4b90-849a-7ef42ff6c00d",
    "isRoot": true,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:04:01Z"
  },
  {
    "uuid": "e9d86587-97a4-4848-8153-c3d31b3bc9ad",
    "fail_kpi_name": "fail kpi reason 2",
    "level": 2,
    "description": "lorem22",
    "parentID": "30655bf3-1015-400a-82cb-3b9e279d72ce",
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:04:01Z"
  },
  {
    "uuid": "eb842975-9997-4b90-849a-7ef42ff6c00d",
    "fail_kpi_name": "fail kpi reason 2",
    "level": 4,
    "description": "lorem44",
    "parentID": "0c004535-0225-4cb9-8052-537bb7f480c9",
    "isRoot": false,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:04:02Z"
  },
  {
    "uuid": "fe51a638-8e40-4aca-b375-5897eeca90c0",
    "fail_kpi_name": "fail kpi reason 1",
    "level": 5,
    "description": "lorem5",
    "parentID": "541b54e8-91b2-41c5-b82d-48a9ff722305",
    "isRoot": true,
    "year": "2024",
    "month": "05",
    "department": "信息化管理",
    "create_user": "cheng.zhou",
    "modify_user": "cheng.zhou",
    "create_date": "2024-05-06T13:56:53Z",
    "modify_date": "2024-05-06T14:04:10Z"
  }
];

// 构建映射关系
const childrenMap = {};
data.forEach(item => {
  if (item.parentID) {
    if (!childrenMap[item.parentID]) {
      childrenMap[item.parentID] = [];
    }
    childrenMap[item.parentID].push(item);
  } else {
    // 根节点
    if (!childrenMap['root']) {
      childrenMap['root'] = [];
    }
    childrenMap['root'].push(item);
  }
});

// 递归构建层级结构
function buildHierarchy(node) {
  const nodeId = node.uuid;
  const level = node.level < 5 ? `level${node.level}Table` : `level${node.level}`;
  const result = {
    isRoot: node.isRoot,
    [level]: node.description
  };
  if (childrenMap[nodeId]) {
    childrenMap[nodeId].forEach(child => {
      const childLevel = `level${child.level}Table`;
      if (!result[childLevel]) {
        result[childLevel] = [];
      }
      result[childLevel].push(buildHierarchy(child));
    });
  }
  return result;
}

// 构建最终的JSON结构
const output = [];
childrenMap['root'].forEach(root => {
  const failKpiName = root.fail_kpi_name;
  const hierarchy = {
    failKpiName: failKpiName,
    level1Table: [buildHierarchy(root)]
  };
  output.push(hierarchy);
});

// 输出结果
console.log(JSON.stringify(output, null, 2));
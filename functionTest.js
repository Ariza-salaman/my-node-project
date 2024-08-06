import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 3,
    max: 7,
  },
  wordsPerSentence: {
    min: 3,
    max: 5,
  },
})

for (let i = 0; i < 10; i++) {
  console.log(lorem.generateSentences(1))
}

const jsobj = {
  inCloudOS: false,
  user: {
    email: 'cheng.zhou@unifil.com',
    username: 'cheng.zhou@unifil.com',
    enableTelemetry: false,
    idToken: {},
    cloudOSLogged: false,
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    emptyInstance: false,
    isAnonymous: false,
    isEnabled: true,
    isSuperUser: false,
    isConfigurable: true,
    adminSettingsVisible: false,
    isIntercomConsentGiven: false,
  },
  URL: {
    fullPath: 'http://192.168.98.198/app/kpi/end-6655a87b25386f500ba5bff4/edit',
    host: '192.168.98.198',
    hostname: '192.168.98.198',
    queryParams: {},
    protocol: 'http:',
    pathname: '/app/kpi/end-6655a87b25386f500ba5bff4/edit',
    port: '',
    hash: '',
  },
  store: {
    yearSelect: [
      { label: '2023年', value: '2023' },
      { label: '2024年', value: '2024' },
      { label: '2025年', value: '2025' },
      { label: '2026年', value: '2026' },
      { label: '2027年', value: '2027' },
      { label: '2028年', value: '2028' },
      { label: '2029年', value: '2029' },
      { label: '2030年', value: '2030' },
    ],
    monthSelect: [
      { label: '1月', value: '01' },
      { label: '2月', value: '02' },
      { label: '3月', value: '03' },
      { label: '4月', value: '04' },
      { label: '5月', value: '05' },
      { label: '6月', value: '06' },
      { label: '7月', value: '07' },
      { label: '8月', value: '08' },
      { label: '9月', value: '09' },
      { label: '10月', value: '10' },
      { label: '11月', value: '11' },
      { label: '12月', value: '12' },
    ],
    username: 'cheng.zhou',
    userDepart: '信息化管理',
    userDepartFull: '信息化管理/IT',
    selectedYear: '2024',
    selectedMonth: '07',
    isEdit: 'Y',
  },
  geolocation: { canBeRequested: true, currentPosition: {} },
  echartInstance: {},
  mode: 'EDIT',
  theme: {
    colors: { primaryColor: '#00148a', backgroundColor: '#F8FAFC' },
    borderRadius: { appBorderRadius: '0.375rem' },
    boxShadow: {
      appBoxShadow:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    fontFamily: { appFont: 'Noto Sans' },
  },
  ENTITY_TYPE: 'APPSMITH',
}

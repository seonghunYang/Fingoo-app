import { HistoryIndicatorValueCursorPaginationResponse } from '@/app/store/querys/numerical-guidance/history-indicator.query';

export type historyIndicatorsValueMockData = (HistoryIndicatorValueCursorPaginationResponse & {
  id: string;
})[];
export const historyIndicatorsValueMockData: historyIndicatorsValueMockData = JSON.parse(`[{
  "id": "9785ba85-c924-4269-8238-e1f10b404177",
  "data": {
    "indicator": {
      "id": "9785ba85-c924-4269-8238-e1f10b404177",
      "name": "삼성전자",
      "ticker": "005930",
      "type": "k-stock",
      "market": "KOSPI"
    },
    "values": [
      {
        "date": "20231228",
        "value": "78.5"
      },
      {
        "date": "20231227",
        "value": "78"
      },
      {
        "date": "20231226",
        "value": "76.6"
      },
      {
        "date": "20231222",
        "value": "75.9"
      },
      {
        "date": "20231221",
        "value": "75"
      },
      {
        "date": "20231220",
        "value": "74.8"
      },
      {
        "date": "20231219",
        "value": "73.4"
      },
      {
        "date": "20231218",
        "value": "72.9"
      },
      {
        "date": "20231215",
        "value": "73.3"
      },
      {
        "date": "20231214",
        "value": "73.1"
      },
      {
        "date": "20231213",
        "value": "72.8"
      },
      {
        "date": "20231212",
        "value": "73.5"
      },
      {
        "date": "20231211",
        "value": "73"
      },
      {
        "date": "20231208",
        "value": "72.6"
      },
      {
        "date": "20231207",
        "value": "71.5"
      },
      {
        "date": "20231206",
        "value": "71.7"
      },
      {
        "date": "20231205",
        "value": "71.2"
      },
      {
        "date": "20231204",
        "value": "72.6"
      },
      {
        "date": "20231201",
        "value": "72"
      },
      {
        "date": "20231130",
        "value": "72.8"
      },
      {
        "date": "20231129",
        "value": "72.7"
      },
      {
        "date": "20231128",
        "value": "72.7"
      },
      {
        "date": "20231127",
        "value": "71.3"
      },
      {
        "date": "20231124",
        "value": "71.7"
      },
      {
        "date": "20231123",
        "value": "72.4"
      },
      {
        "date": "20231122",
        "value": "72.8"
      },
      {
        "date": "20231121",
        "value": "72.8"
      },
      {
        "date": "20231120",
        "value": "72.7"
      },
      {
        "date": "20231117",
        "value": "72.5"
      },
      {
        "date": "20231116",
        "value": "72.8"
      },
      {
        "date": "20231115",
        "value": "72.2"
      },
      {
        "date": "20231114",
        "value": "70.8"
      },
      {
        "date": "20231113",
        "value": "70.4"
      },
      {
        "date": "20231110",
        "value": "70.5"
      },
      {
        "date": "20231109",
        "value": "70.3"
      },
      {
        "date": "20231108",
        "value": "69.9"
      },
      {
        "date": "20231107",
        "value": "70.9"
      },
      {
        "date": "20231106",
        "value": "70.9"
      },
      {
        "date": "20231103",
        "value": "69.6"
      },
      {
        "date": "20231102",
        "value": "69.7"
      },
      {
        "date": "20231101",
        "value": "68.6"
      },
      {
        "date": "20231031",
        "value": "66.9"
      },
      {
        "date": "20231030",
        "value": "67.3"
      },
      {
        "date": "20231027",
        "value": "67.3"
      },
      {
        "date": "20231026",
        "value": "66.7"
      },
      {
        "date": "20231025",
        "value": "68"
      },
      {
        "date": "20231024",
        "value": "68.5"
      },
      {
        "date": "20231023",
        "value": "68.4"
      },
      {
        "date": "20231020",
        "value": "68.8"
      },
      {
        "date": "20231019",
        "value": "69.5"
      },
      {
        "date": "20231018",
        "value": "70.5"
      },
      {
        "date": "20231017",
        "value": "69.4"
      },
      {
        "date": "20231016",
        "value": "67.3"
      },
      {
        "date": "20231013",
        "value": "68"
      },
      {
        "date": "20231012",
        "value": "68.9"
      },
      {
        "date": "20231011",
        "value": "68.2"
      },
      {
        "date": "20231010",
        "value": "66.4"
      },
      {
        "date": "20231006",
        "value": "66"
      },
      {
        "date": "20231005",
        "value": "66.7"
      },
      {
        "date": "20231004",
        "value": "67.5"
      },
      {
        "date": "20230927",
        "value": "68.4"
      },
      {
        "date": "20230926",
        "value": "68.6"
      },
      {
        "date": "20230925",
        "value": "69.4"
      },
      {
        "date": "20230922",
        "value": "68.8"
      },
      {
        "date": "20230921",
        "value": "68.9"
      },
      {
        "date": "20230920",
        "value": "69.6"
      },
      {
        "date": "20230919",
        "value": "69.8"
      },
      {
        "date": "20230918",
        "value": "70.2"
      },
      {
        "date": "20230915",
        "value": "72"
      },
      {
        "date": "20230914",
        "value": "71.7"
      },
      {
        "date": "20230913",
        "value": "70.9"
      },
      {
        "date": "20230912",
        "value": "70.5"
      },
      {
        "date": "20230911",
        "value": "70.8"
      },
      {
        "date": "20230908",
        "value": "70.3"
      },
      {
        "date": "20230907",
        "value": "70.4"
      },
      {
        "date": "20230906",
        "value": "70"
      },
      {
        "date": "20230905",
        "value": "70.7"
      },
      {
        "date": "20230904",
        "value": "71.2"
      },
      {
        "date": "20230901",
        "value": "71"
      },
      {
        "date": "20230831",
        "value": "66.9"
      },
      {
        "date": "20230830",
        "value": "67.1"
      },
      {
        "date": "20230829",
        "value": "66.8"
      },
      {
        "date": "20230828",
        "value": "66.8"
      },
      {
        "date": "20230825",
        "value": "67.1"
      },
      {
        "date": "20230824",
        "value": "68.2"
      },
      {
        "date": "20230823",
        "value": "67.1"
      },
      {
        "date": "20230822",
        "value": "66.6"
      },
      {
        "date": "20230821",
        "value": "66.6"
      },
      {
        "date": "20230818",
        "value": "66.3"
      },
      {
        "date": "20230817",
        "value": "66.7"
      },
      {
        "date": "20230816",
        "value": "67"
      },
      {
        "date": "20230814",
        "value": "67.3"
      },
      {
        "date": "20230811",
        "value": "67.5"
      },
      {
        "date": "20230810",
        "value": "68"
      },
      {
        "date": "20230809",
        "value": "68.9"
      },
      {
        "date": "20230808",
        "value": "67.6"
      },
      {
        "date": "20230807",
        "value": "68.5"
      },
      {
        "date": "20230804",
        "value": "68.3"
      },
      {
        "date": "20230803",
        "value": "68.8"
      },
      {
        "date": "20230802",
        "value": "69.9"
      },
      {
        "date": "20230801",
        "value": "71.1"
      },
      {
        "date": "20230731",
        "value": "69.8"
      },
      {
        "date": "20230728",
        "value": "70.6"
      },
      {
        "date": "20230727",
        "value": "71.7"
      },
      {
        "date": "20230726",
        "value": "69.8"
      },
      {
        "date": "20230725",
        "value": "70"
      },
      {
        "date": "20230724",
        "value": "70.4"
      },
      {
        "date": "20230721",
        "value": "70.3"
      },
      {
        "date": "20230720",
        "value": "71"
      },
      {
        "date": "20230719",
        "value": "71.7"
      },
      {
        "date": "20230718",
        "value": "72"
      },
      {
        "date": "20230717",
        "value": "73.3"
      },
      {
        "date": "20230714",
        "value": "73.4"
      },
      {
        "date": "20230713",
        "value": "71.9"
      },
      {
        "date": "20230712",
        "value": "71.9"
      },
      {
        "date": "20230711",
        "value": "71.5"
      },
      {
        "date": "20230710",
        "value": "69.5"
      },
      {
        "date": "20230707",
        "value": "69.9"
      },
      {
        "date": "20230706",
        "value": "71.6"
      },
      {
        "date": "20230705",
        "value": "72"
      },
      {
        "date": "20230704",
        "value": "73"
      },
      {
        "date": "20230703",
        "value": "73"
      },
      {
        "date": "20230630",
        "value": "72.2"
      },
      {
        "date": "20230629",
        "value": "72.4"
      },
      {
        "date": "20230628",
        "value": "72.7"
      },
      {
        "date": "20230627",
        "value": "72.6"
      },
      {
        "date": "20230626",
        "value": "72.4"
      },
      {
        "date": "20230623",
        "value": "71.6"
      },
      {
        "date": "20230622",
        "value": "71.3"
      },
      {
        "date": "20230621",
        "value": "70.5"
      },
      {
        "date": "20230620",
        "value": "71.4"
      },
      {
        "date": "20230619",
        "value": "71.2"
      },
      {
        "date": "20230616",
        "value": "71.8"
      },
      {
        "date": "20230615",
        "value": "71.5"
      },
      {
        "date": "20230614",
        "value": "71.9"
      },
      {
        "date": "20230613",
        "value": "72"
      },
      {
        "date": "20230612",
        "value": "71"
      },
      {
        "date": "20230609",
        "value": "72"
      },
      {
        "date": "20230608",
        "value": "70.9"
      },
      {
        "date": "20230607",
        "value": "71"
      },
      {
        "date": "20230605",
        "value": "71.7"
      },
      {
        "date": "20230602",
        "value": "72.2"
      },
      {
        "date": "20230601",
        "value": "70.9"
      },
      {
        "date": "20230531",
        "value": "71.4"
      },
      {
        "date": "20230530",
        "value": "72.3"
      },
      {
        "date": "20230526",
        "value": "70.3"
      },
      {
        "date": "20230525",
        "value": "68.8"
      },
      {
        "date": "20230524",
        "value": "68.5"
      },
      {
        "date": "20230523",
        "value": "68.4"
      },
      {
        "date": "20230522",
        "value": "68.5"
      },
      {
        "date": "20230519",
        "value": "68.4"
      },
      {
        "date": "20230518",
        "value": "66.2"
      },
      {
        "date": "20230517",
        "value": "65"
      },
      {
        "date": "20230516",
        "value": "65.4"
      },
      {
        "date": "20230515",
        "value": "64.5"
      },
      {
        "date": "20230512",
        "value": "64.1"
      },
      {
        "date": "20230511",
        "value": "64.2"
      },
      {
        "date": "20230510",
        "value": "64.6"
      },
      {
        "date": "20230509",
        "value": "65.3"
      },
      {
        "date": "20230508",
        "value": "65.9"
      },
      {
        "date": "20230504",
        "value": "65.1"
      },
      {
        "date": "20230503",
        "value": "65.4"
      },
      {
        "date": "20230502",
        "value": "65.7"
      },
      {
        "date": "20230428",
        "value": "65.5"
      },
      {
        "date": "20230427",
        "value": "64.6"
      },
      {
        "date": "20230426",
        "value": "64.1"
      },
      {
        "date": "20230425",
        "value": "63.6"
      },
      {
        "date": "20230424",
        "value": "65.2"
      },
      {
        "date": "20230421",
        "value": "65.7"
      },
      {
        "date": "20230420",
        "value": "65.3"
      },
      {
        "date": "20230419",
        "value": "65.5"
      },
      {
        "date": "20230418",
        "value": "65.6"
      },
      {
        "date": "20230417",
        "value": "65.3"
      },
      {
        "date": "20230414",
        "value": "65.1"
      },
      {
        "date": "20230413",
        "value": "66.1"
      },
      {
        "date": "20230412",
        "value": "66"
      },
      {
        "date": "20230411",
        "value": "65.9"
      },
      {
        "date": "20230410",
        "value": "65.7"
      },
      {
        "date": "20230407",
        "value": "65"
      },
      {
        "date": "20230406",
        "value": "62.3"
      },
      {
        "date": "20230405",
        "value": "63.9"
      },
      {
        "date": "20230404",
        "value": "63.6"
      },
      {
        "date": "20230403",
        "value": "63.1"
      },
      {
        "date": "20230331",
        "value": "64"
      },
      {
        "date": "20230330",
        "value": "63.2"
      },
      {
        "date": "20230329",
        "value": "62.7"
      },
      {
        "date": "20230328",
        "value": "62.9"
      },
      {
        "date": "20230327",
        "value": "62.1"
      },
      {
        "date": "20230324",
        "value": "63"
      },
      {
        "date": "20230323",
        "value": "62.3"
      },
      {
        "date": "20230322",
        "value": "61.1"
      },
      {
        "date": "20230321",
        "value": "60.3"
      },
      {
        "date": "20230320",
        "value": "60.2"
      },
      {
        "date": "20230317",
        "value": "61.3"
      },
      {
        "date": "20230316",
        "value": "59.9"
      },
      {
        "date": "20230315",
        "value": "59.8"
      },
      {
        "date": "20230314",
        "value": "59"
      },
      {
        "date": "20230313",
        "value": "60"
      },
      {
        "date": "20230310",
        "value": "59.5"
      },
      {
        "date": "20230309",
        "value": "60.1"
      },
      {
        "date": "20230308",
        "value": "60.3"
      },
      {
        "date": "20230307",
        "value": "60.7"
      },
      {
        "date": "20230306",
        "value": "61.5"
      },
      {
        "date": "20230303",
        "value": "60.5"
      },
      {
        "date": "20230302",
        "value": "60.8"
      },
      {
        "date": "20230228",
        "value": "60.6"
      },
      {
        "date": "20230227",
        "value": "60.5"
      },
      {
        "date": "20230224",
        "value": "61.3"
      },
      {
        "date": "20230223",
        "value": "62"
      },
      {
        "date": "20230222",
        "value": "61.1"
      },
      {
        "date": "20230221",
        "value": "62.1"
      },
      {
        "date": "20230220",
        "value": "62.7"
      },
      {
        "date": "20230217",
        "value": "62.6"
      },
      {
        "date": "20230216",
        "value": "63.7"
      },
      {
        "date": "20230215",
        "value": "62.2"
      },
      {
        "date": "20230214",
        "value": "63.2"
      },
      {
        "date": "20230213",
        "value": "62.9"
      },
      {
        "date": "20230210",
        "value": "62.8"
      },
      {
        "date": "20230209",
        "value": "63"
      },
      {
        "date": "20230208",
        "value": "63.1"
      },
      {
        "date": "20230207",
        "value": "61.9"
      },
      {
        "date": "20230206",
        "value": "61.6"
      },
      {
        "date": "20230203",
        "value": "63.8"
      },
      {
        "date": "20230202",
        "value": "63.5"
      },
      {
        "date": "20230201",
        "value": "61.8"
      },
      {
        "date": "20230131",
        "value": "61"
      },
      {
        "date": "20230130",
        "value": "63.3"
      },
      {
        "date": "20230127",
        "value": "64.6"
      },
      {
        "date": "20230126",
        "value": "63.9"
      },
      {
        "date": "20230125",
        "value": "63.4"
      },
      {
        "date": "20230120",
        "value": "61.8"
      },
      {
        "date": "20230119",
        "value": "61.5"
      },
      {
        "date": "20230118",
        "value": "60.4"
      },
      {
        "date": "20230117",
        "value": "61"
      },
      {
        "date": "20230116",
        "value": "61.1"
      },
      {
        "date": "20230113",
        "value": "60.8"
      },
      {
        "date": "20230112",
        "value": "60.5"
      },
      {
        "date": "20230111",
        "value": "60.5"
      },
      {
        "date": "20230110",
        "value": "60.4"
      },
      {
        "date": "20230109",
        "value": "60.7"
      },
      {
        "date": "20230106",
        "value": "59"
      },
      {
        "date": "20230105",
        "value": "58.2"
      },
      {
        "date": "20230104",
        "value": "57.8"
      },
      {
        "date": "20230103",
        "value": "55.4"
      },
      {
        "date": "20230102",
        "value": "55.5"
      }
    ]
  },
  "meta": {
    "total": 245,
    "hasNextData": true,
    "cursor": "20221229"
  }
}]`);
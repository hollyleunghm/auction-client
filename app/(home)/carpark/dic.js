const json = [{
    "_id": {
        "$oid": "663108afe44829ae99cc5fef"
    },
    "value": "LandUse",
    "label": "土地用途",
    "options": [
        {
            "id": "1-1",
            "value": "Residential",
            "label": "住宅"
        },
        {
            "id": "1-2",
            "value": "Commerical",
            "label": "工商业"
        },
        {
            "id": "1-3",
            "value": "Agrucultural",
            "label": "土地/農地"
        }
    ]
},
{
    "_id": {
        "$oid": "663108d1e44829ae99cc5ff3"
    },
    "value": "Region",
    "label": "地區",
    "options": [
        {
            "id": "5-1",
            "value": "HongKongIsland",
            "label": "港島",
            "children": [
                {
                    "value": "CentralRegion",
                    "label": "中環",
                    "children": [
                        {
                            "id": "5-1-1",
                            "value": "Central",
                            "label": "中環"
                        },
                        {
                            "id": "5-1-2",
                            "value": "Admiralty",
                            "label": "金鐘"
                        },
                        {
                            "id": "5-1-3",
                            "value": "MidLevels",
                            "label": "半山"
                        },
                        {
                            "id": "5-1-4",
                            "value": "VictoriaPeak",
                            "label": "太平山"
                        },
                        {
                            "id": "5-1-5",
                            "value": "SheungWan",
                            "label": "上環"
                        }
                    ]
                },
                {
                    "value": "WesternRegion",
                    "label": "西區",
                    "children": [
                        {
                            "id": "5-1-6",
                            "value": "WestMidLevels",
                            "label": "西半山"
                        },
                        {
                            "id": "5-1-7",
                            "value": "KennedyTown",
                            "label": "堅尼地城"
                        },
                        {
                            "id": "5-1-8",
                            "value": "SaiWan",
                            "label": "西環"
                        },
                        {
                            "id": "5-1-9",
                            "value": "SaiYingPun",
                            "label": "西營盤"
                        },
                        {
                            "id": "5-1-10",
                            "value": "ShekTongTsui",
                            "label": "石塘咀"
                        },
                        {
                            "id": "5-1-11",
                            "value": "PokFuLam",
                            "label": "薄扶林"
                        }
                    ]
                },
                {
                    "value": "SouthernRegion",
                    "label": "南區",
                    "children": [
                        {
                            "id": "5-1-12",
                            "value": "Aberdeen",
                            "label": "香港仔"
                        },
                        {
                            "id": "5-1-13",
                            "value": "ApLeiChau",
                            "label": "鴨脷洲"
                        },
                        {
                            "id": "5-1-14",
                            "value": "Cyberport",
                            "label": "數碼港"
                        },
                        {
                            "id": "5-1-15",
                            "value": "Stanley",
                            "label": "赤柱"
                        },
                        {
                            "id": "5-1-16",
                            "value": "TaiTam",
                            "label": "大潭"
                        },
                        {
                            "id": "5-1-17",
                            "value": "ShekO",
                            "label": "石澳"
                        },
                        {
                            "id": "5-1-18",
                            "value": "WongChukHang",
                            "label": "黃竹坑"
                        },
                        {
                            "id": "5-1-19",
                            "value": "RepulseBay",
                            "label": "淺水灣"
                        },
                        {
                            "id": "5-1-20",
                            "value": "DeepWaterBay",
                            "label": "深水灣"
                        }
                    ]
                },
                {
                    "value": "EasternRegion",
                    "label": "東區",
                    "children": [
                        {
                            "id": "5-1-21",
                            "value": "NorthPoint",
                            "label": "北角"
                        },
                        {
                            "id": "5-1-22",
                            "value": "QuarryBay",
                            "label": "鰂魚湧"
                        },
                        {
                            "id": "5-1-23",
                            "value": "SaiWanHo",
                            "label": "西灣河"
                        },
                        {
                            "id": "5-1-24",
                            "value": "ShauKeiWan",
                            "label": "筲箕灣"
                        },
                        {
                            "id": "5-1-25",
                            "value": "SiuSaiWan",
                            "label": "小西灣"
                        },
                        {
                            "id": "5-1-26",
                            "value": "ChaiWan",
                            "label": "柴灣"
                        },
                        {
                            "id": "5-1-27",
                            "value": "EastMid-Levels",
                            "label": "東半山"
                        },
                        {
                            "id": "5-1-28",
                            "value": "FortressHill",
                            "label": "砲台山"
                        }
                    ]
                },
                {
                    "value": "WanChaiRegion",
                    "label": "灣仔",
                    "children": [
                        {
                            "id": "5-1-29",
                            "value": "TaiHang",
                            "label": "大坑"
                        },
                        {
                            "id": "5-1-30",
                            "value": "WanChai",
                            "label": "灣仔"
                        },
                        {
                            "id": "5-1-31",
                            "value": "TinHau",
                            "label": "天后"
                        },
                        {
                            "id": "5-1-32",
                            "value": "BraemarHill",
                            "label": "寶馬山"
                        },
                        {
                            "id": "5-1-33",
                            "value": "CausewayBay",
                            "label": "銅鑼灣"
                        },
                        {
                            "id": "5-1-34",
                            "value": "HappyValley",
                            "label": "跑馬地"
                        },
                        {
                            "id": "5-1-35",
                            "value": "JardinesLookout",
                            "label": "渣甸山"
                        }
                    ]
                }
            ]
        },
        {
            "id": "5-2",
            "value": "Kowloon",
            "label": "九龍",
            "children": [
                {
                    "value": "WestKowloonRegion",
                    "label": "西九龍",
                    "children": [
                        {
                            "id": "5-2-1",
                            "value": "Austin",
                            "label": "柯士甸"
                        },
                        {
                            "id": "5-2-2",
                            "value": "WestKowloon",
                            "label": "西九龍"
                        }
                    ]
                },
                {
                    "value": "YauTsimMongRegion",
                    "label": "油尖旺",
                    "children": [
                        {
                            "id": "5-2-3",
                            "value": "TsimShaTsui",
                            "label": "尖沙咀"
                        },
                        {
                            "id": "5-2-4",
                            "value": "Jordan",
                            "label": "佐敦"
                        },
                        {
                            "id": "5-2-5",
                            "value": "YauMaTei",
                            "label": "油麻地"
                        },
                        {
                            "id": "5-2-6",
                            "value": "MongKok",
                            "label": "旺角"
                        },
                        {
                            "id": "5-2-7",
                            "value": "PrinceEdward",
                            "label": "太子"
                        },
                        {
                            "id": "5-2-8",
                            "value": "TaiKokTsui",
                            "label": "大角咀"
                        }
                    ]
                },
                {
                    "value": "ShamShuiPoRegion",
                    "label": "深水埗",
                    "children": [
                        {
                            "id": "5-2-9",
                            "value": "ShamShuiPo",
                            "label": "深水埗"
                        },
                        {
                            "id": "5-2-10",
                            "value": "CheungShaWan",
                            "label": "長沙灣"
                        },
                        {
                            "id": "5-2-11",
                            "value": "LaiChiKok",
                            "label": "荔枝角"
                        }
                    ]
                },
                {
                    "value": "HoManTinRegion",
                    "label": "何文田",
                    "children": [
                        {
                            "id": "5-2-12",
                            "value": "HoManTin",
                            "label": "何文田"
                        }
                    ]
                },
                {
                    "value": "WongTaiSinRegion",
                    "label": "黃大仙",
                    "children": [
                        {
                            "id": "5-2-13",
                            "value": "WongTaiSin",
                            "label": "黃大仙"
                        },
                        {
                            "id": "5-2-14",
                            "value": "DiamondHill",
                            "label": "鑽石山"
                        },
                        {
                            "id": "5-2-15",
                            "value": "ChoiHung",
                            "label": "彩虹"
                        },
                        {
                            "id": "5-2-16",
                            "value": "NgauChiWan",
                            "label": "牛池灣"
                        },
                        {
                            "id": "5-2-17",
                            "value": "TszWanShan",
                            "label": "慈雲山"
                        }
                    ]
                },
                {
                    "value": "KowloonCityRegion",
                    "label": "九龍城",
                    "children": [
                        {
                            "id": "5-2-18",
                            "value": "KowloonCity",
                            "label": "九龍城"
                        },
                        {
                            "id": "5-2-19",
                            "value": "KaiTak",
                            "label": "啟德"
                        },
                        {
                            "id": "5-2-20",
                            "value": "MaTauWai",
                            "label": "馬頭圍"
                        },
                        {
                            "id": "5-2-21",
                            "value": "SanPoKong",
                            "label": "新蒲崗"
                        },
                        {
                            "id": "5-2-22",
                            "value": "ToKwaWan",
                            "label": "土瓜灣"
                        }
                    ]
                },
                {
                    "value": "KowloonTongRegion",
                    "label": "九龍塘",
                    "children": [
                        {
                            "id": "5-2-23",
                            "value": "KowloonTong",
                            "label": "九龍塘"
                        },
                        {
                            "id": "5-2-24",
                            "value": "ShekKipMei",
                            "label": "石硤尾"
                        }
                    ]
                },
                {
                    "value": "KowloonBayRegion",
                    "label": "九龍灣",
                    "children": [
                        {
                            "id": "5-2-25",
                            "value": "KowloonBay",
                            "label": "九龍灣"
                        },
                        {
                            "id": "5-2-26",
                            "value": "NgauTauKok",
                            "label": "牛頭角"
                        }
                    ]
                },
                {
                    "value": "KowloonRegion",
                    "label": "九龍",
                    "children": [
                        {
                            "id": "5-2-27",
                            "value": "KowloonStation",
                            "label": "九龍站"
                        },
                        {
                            "id": "5-2-28",
                            "value": "Olympics",
                            "label": "奧運"
                        }
                    ]
                },
                {
                    "value": "HungHomRegion",
                    "label": "紅磡",
                    "children": [
                        {
                            "id": "5-2-29",
                            "value": "HungHom",
                            "label": "紅磡"
                        }
                    ]
                },
                {
                    "value": "KwunTongRegion",
                    "label": "觀塘",
                    "children": [
                        {
                            "id": "5-2-30",
                            "value": "KwunTong",
                            "label": "觀塘"
                        },
                        {
                            "id": "5-2-31",
                            "value": "ChaKwoLing",
                            "label": "茶果嶺"
                        },
                        {
                            "id": "5-2-32",
                            "value": "SauMauPing",
                            "label": "秀茂坪"
                        }
                    ]
                },
                {
                    "value": "YauTongRegion",
                    "label": "油塘",
                    "children": [
                        {
                            "id": "5-2-33",
                            "value": "YauTong",
                            "label": "油塘"
                        },
                        {
                            "id": "5-2-34",
                            "value": "LamTin",
                            "label": "藍田"
                        },
                        {
                            "id": "5-2-35",
                            "value": "LeiYueMun",
                            "label": "鯉魚門"
                        }
                    ]
                }
            ]
        },
        {
            "id": "5-3",
            "value": "NewTerritories",
            "label": "新界",
            "children": [
                {
                    "value": "SaiKungRegion",
                    "label": "西貢",
                    "children": [
                        {
                            "id": "5-3-1",
                            "value": "SaiKung",
                            "label": "西貢"
                        },
                        {
                            "id": "5-3-2",
                            "value": "ClearwaterBay",
                            "label": "清水灣"
                        }
                    ]
                },
                {
                    "value": "TseungKwanORegion",
                    "label": "將軍澳",
                    "children": [
                        {
                            "id": "5-3-3",
                            "value": "TseungKwanO",
                            "label": "將軍澳"
                        },
                        {
                            "id": "5-3-4",
                            "value": "LOHASPark",
                            "label": "日出康城"
                        }
                    ]
                },
                {
                    "value": "ShaTinRegion",
                    "label": "沙田",
                    "children": [
                        {
                            "id": "5-3-5",
                            "value": "MaOnShan",
                            "label": "馬鞍山"
                        },
                        {
                            "id": "5-3-6",
                            "value": "ShaTin",
                            "label": "沙田"
                        },
                        {
                            "id": "5-3-7",
                            "value": "TaiWai",
                            "label": "大圍"
                        },
                        {
                            "id": "5-3-8",
                            "value": "FoTan",
                            "label": "火炭"
                        }
                    ]
                },
                {
                    "value": "TaiPoRegion",
                    "label": "大埔",
                    "children": [
                        {
                            "id": "5-3-9",
                            "value": "TaiPo",
                            "label": "大埔"
                        },
                        {
                            "id": "5-3-10",
                            "value": "TaiWo",
                            "label": "太和"
                        }
                    ]
                },
                {
                    "value": "NorthernRegion",
                    "label": "北區",
                    "children": [
                        {
                            "id": "5-3-11",
                            "value": "Fanling",
                            "label": "粉嶺"
                        },
                        {
                            "id": "5-3-12",
                            "value": "SheungShui",
                            "label": "上水"
                        },
                        {
                            "id": "5-3-13",
                            "value": "ShaTauKok",
                            "label": "沙頭角"
                        }
                    ]
                },
                {
                    "value": "TuenMunRegion",
                    "label": "屯門",
                    "children": [
                        {
                            "id": "5-3-14",
                            "value": "TuenMun",
                            "label": "屯門"
                        },
                        {
                            "id": "5-3-15",
                            "value": "ShamTseng",
                            "label": "深井"
                        }
                    ]
                },
                {
                    "value": "YuenLongRegion",
                    "label": "元朗",
                    "children": [
                        {
                            "id": "5-3-16",
                            "value": "YuenLong",
                            "label": "元朗"
                        }
                    ]
                },
                {
                    "value": "TinShuiWaiRegion",
                    "label": "天水圍",
                    "children": [
                        {
                            "id": "5-3-17",
                            "value": "TinShuiWai",
                            "label": "天水圍"
                        }
                    ]
                },
                {
                    "value": "KwaiTsingRegion",
                    "label": "葵青",
                    "children": [
                        {
                            "id": "5-3-18",
                            "value": "TaiWoHau",
                            "label": "大窩口"
                        },
                        {
                            "id": "5-3-19",
                            "value": "KwaiChung",
                            "label": "葵涌"
                        },
                        {
                            "id": "5-3-20",
                            "value": "KwaiFong",
                            "label": "葵芳"
                        },
                        {
                            "id": "5-3-21",
                            "value": "TsingYi",
                            "label": "青衣"
                        }
                    ]
                },
                {
                    "value": "TsuenWanRegion",
                    "label": "荃灣",
                    "children": [
                        {
                            "id": "5-3-22",
                            "value": "TsuenWan",
                            "label": "荃灣"
                        }
                    ]
                }
            ]
        }
    ]
},
{
    "_id": {
        "$oid": "663109b3e44829ae99cc5ffe"
    },
    "value": "Environment",
    "label": "環境",
    "options": [
        {
            "id": "2-1",
            "value": "Indoor",
            "label": "室內"
        },
        {
            "id": "2-2",
            "value": "Outdoor",
            "label": "室外"
        }
    ]
},
{
    "_id": {
        "$oid": "66310a17e44829ae99cc6000"
    },
    "value": "Type",
    "label": "類型",
    "options": [
        {
            "id": "3-1",
            "value": "PrivateCar",
            "label": "私家車"
        },
        {
            "id": "3-2",
            "value": "Motorcycle",
            "label": "電單車"
        },
        {
            "id": "3-3",
            "value": "Lorry",
            "label": "貨車"
        }
    ]
},
{
    "_id": {
        "$oid": "663108efe44829ae99cc5ff7"
    },
    "value": "BIddingStatus",
    "label": "拍賣狀態",
    "options": [
        {
            "id": "7-1",
            "value": "InProgress",
            "label": "正在進行"
        },
        {
            "id": "7-2",
            "value": "AboutToStart",
            "label": "即將開始"
        },
        {
            "id": "7-3",
            "value": "Completed",
            "label": "已結束"
        },
        {
            "id": "7-4",
            "value": "Aborted",
            "label": "中止"
        },
        {
            "id": "7-5",
            "value": "Cancelled",
            "label": "撤回"
        }
    ]
}];
export default json;
"use client";
import { useState, useEffect, useCallback } from "react";
import { MultiCascader, SelectPicker, InputGroup, InputNumber } from "rsuite";
import { throttle } from "lodash";
import Link from "next/link";
import Image from "next/image";
import json from "./dic";
export default function Property({ carParks }) {
    const [filteredCarParks, setFilteredCarParks] = useState(carParks);
    const [filter, setFilter] = useState({});
    function getChildrenValues(values, data) {
        let result = [];

        function traverse(nodes, flag) {
            nodes.map((node) => {
                if (flag) {
                    result.push(node.value);
                    if (node.children) {
                        traverse(node.children, flag);
                    }
                }
                // 先判斷第一層層是否有選中的
                if (values.includes(node.value)) {
                    result.push(node.value);
                    if (node.children) {
                        traverse(node.children, true);
                    }
                } else {
                    if (node.children) {
                        traverse(node.children);
                    }
                }

            });
            return result;
        }

        traverse(data.options);
        return result;
    }
    const changeHandle = (value, item) => {
        let values = getChildrenValues(value, item);
        setFilter({
            ...filter,
            [item.value]: values,
        });
    };
    const sortData = [
        {
            value: "price1",
            label: "價格由低到高",
        },
        {
            value: "price2",
            label: "價格由高到低",
        },
        {
            value: "date",
            label: "添加日期",
        },
    ];
    const [sortValue, setSortValue] = useState();
    const [maxPrice, setMaxPrice] = useState(5000000);
    const [minPrice, setMinPrice] = useState(0);

    useEffect(() => {
        let result = [...carParks];
        Object.keys(filter).forEach((key) => {
            let filterValue = filter[key];
            result = result.filter((item) => {
                let value = item[key];
                if (filterValue.includes(value) || filterValue.length === 0) {
                    return true;
                }
            });
        });
        if (minPrice) {
            result = result.filter((item) => {
                return item.startingPrice >= minPrice;
            });
        }
        if (maxPrice) {
            result = result.filter((item) => {
                return item.startingPrice <= maxPrice;
            });
        }
        setFilteredCarParks(result);
    }, [filter, minPrice, maxPrice, carParks]);
    useEffect(() => {
        if (!sortValue) {
            return;
        }
        const res = filteredCarParks.sort((a, b) => {
            switch (sortValue) {
                case "price1":
                    return a.startingPrice > b.startingPrice ? 1 : -1;
                case "price2":
                    return a.startingPrice < b.startingPrice ? 1 : -1;
                case "date":
                    return new Date(a.CreatedAt) > new Date(b.CreatedAt) ? 1 : -1;
                // case "area1":
                //     return a.constructionArea > b.constructionArea ? 1 : -1;
                // case "area2":
                //     return a.constructionArea < b.constructionArea ? 1 : -1;
                // case "unit1":
                //     return a.pricePerFoot1 > b.pricePerFoot1 ? 1 : -1;
                // case "unit2":
                //     return a.pricePerFoot1 < b.pricePerFoot1 ? 1 : -1;
            }
        });
        setFilteredCarParks([...res]);
    }, [sortValue]);
    return (
        <div>
            <div className="bg-[#253d59] py-6">
                <div className="w-full max-w-[1000px] mx-auto px-4 md:px-0">
                    <h2 className="text-xl text-white mb-2">請選擇</h2>
                    <div className="bg-white rounded-sm px-4 py-2 grid grid-cols-1 md:grid-cols-2">
                        {/* {JSON.stringify(json)} */}
                        {json.map((item) => {
                            return (
                                <div className="flex items-center mb-4" key={item.value}>
                                    <div className="w-28">{item.label}</div>
                                    <div className="fex-1 flex gap-6">
                                        <MultiCascader
                                            data={item.options}
                                            searchable={false}
                                            style={{ width: 300 }}
                                            placeholder={"請選擇" + item.label}
                                            onChange={(value) => {
                                                changeHandle(value, item);
                                            }}
                                        ></MultiCascader>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="py-4 md:flex gap-8 items-center">
                        <SelectPicker
                            label="排序"
                            searchable={false}
                            data={sortData}
                            style={{ width: 200 }}
                            onChange={(value) => {
                                setSortValue(value);
                            }}
                            className="mb-4 md:mb-0"
                        />
                        {/* <DatePicker placeholder="拍卖时间" /> */}
                        <div className="md:flex flex-1 md:px-4 gap-4 text-white">
                            <InputGroup inside className="mb-4 md:mb-0">
                                <InputGroup.Addon>最低價</InputGroup.Addon>
                                <InputNumber onChange={(value) => { setMinPrice(value) }}></InputNumber>
                            </InputGroup>
                            <InputGroup inside>
                                <InputGroup.Addon>最高價</InputGroup.Addon>
                                <InputNumber onChange={(value) => { setMaxPrice(value) }}></InputNumber>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full max-w-[1000px] mx-auto py-8 px-4 md:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filteredCarParks.map((item) => {
                            return (
                                <div key={item._id}>
                                    <Link href={"/carpark/" + item._id}>
                                        <div className="w-full text-black mt2">
                                            <Image height={400} width={500} style={{ objectFit: "cover", aspectRatio: "1" }} src={item.mainImage} alt="" />
                                            <div>
                                                <p className="text-lg font-semibold">{item.title}</p>
                                                <div className="w-12 my-2 border-b border-black"></div>
                                                <p>HK${item.startingPrice.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                        {/* <div className="px-2">
                            <Link href="/property/1">
                                <div className="w-full text-black">
                                    <img src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg" alt="" />
                                    <div>
                                        <p>Tai Hing Gardens Phrase 2 tower 2 Middle floor Flat B</p>
                                        <div className="w-12 my-2 border-b border-black"></div>
                                        <p>HK$ 5,000,000.00</p>
                                        <p>523呎</p>
                                        <p>＄15031/呎</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="px-2">
                            <Link href="/property/1">
                                <div className="w-full text-black">
                                    <img src="https://static.wixstatic.com/media/18190a_c639142ee4f14209ab09483b01af967f~mv2.jpeg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_c639142ee4f14209ab09483b01af967f~mv2.jpeg" alt="" />
                                    <div>
                                        <p>Tai Hing Gardens Phrase 2 tower 2 Middle floor Flat B</p>
                                        <div className="w-12 my-2 border-b border-black"></div>
                                        <p>HK$ 5,000,000.00</p>
                                        <p>523呎</p>
                                        <p>＄15031/呎</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="px-2">
                            <Link href="/property/1">
                                <div className="w-full text-black">
                                    <img src="https://static.wixstatic.com/media/18190a_9010c7e5146d4ab395255314bf9e5379~mv2.jpeg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_9010c7e5146d4ab395255314bf9e5379~mv2.jpeg" alt="" />
                                    <div>
                                        <p>Tai Hing Gardens Phrase 2 tower 2 Middle floor Flat B</p>
                                        <div className="w-12 my-2 border-b border-black"></div>
                                        <p>HK$ 5,000,000.00</p>
                                        <p>523呎</p>
                                        <p>＄15031/呎</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="px-2">
                            <Link href="/property/1">
                                <div className="w-full text-black">
                                    <img src="https://static.wixstatic.com/media/18190a_c639142ee4f14209ab09483b01af967f~mv2.jpeg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_c639142ee4f14209ab09483b01af967f~mv2.jpeg" alt="" />
                                    <div>
                                        <p>Tai Hing Gardens Phrase 2 tower 2 Middle floor Flat B</p>
                                        <div className="w-12 my-2 border-b border-black"></div>
                                        <p>HK$ 5,000,000.00</p>
                                        <p>523呎</p>
                                        <p>＄15031/呎</p>
                                    </div>
                                </div>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { MultiCascader, SelectPicker, InputGroup, InputNumber, DateRangePicker } from "rsuite";
import Link from "next/link";
import Image from "next/image";
import json from "./dic";
import { useTranslation } from "@/app/i18n/client";
export default function Property({ properties, lng }) {
    const { t } = useTranslation(lng);
    let labelKey = "label1";
    if (lng === "zhcn") {
        labelKey = "label2";
    } else if (lng === "en") {
        labelKey = "label3";
    }
    const [filteredProperties, setFilteredProperties] = useState(properties);
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
            label: t("price1"),
        },
        {
            value: "price2",
            label: t("price2"),
        },
        {
            value: "date",
            label: t("postDate"),
        },

        {
            value: "area1",
            label: t("area1"),
        },
        {
            value: "area2",
            label: t("area2"),
        },
        {
            value: "unit1",
            label: t("unit1"),
        },
        {
            value: "unit2",
            label: t("unit2"),
        },
    ];
    const [sortValue, setSortValue] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [minPrice, setMinPrice] = useState();
    const [dateRange, setDateRange] = useState();
    useEffect(() => {
        let result = [...properties];
        Object.keys(filter).forEach((key) => {
            let filterValue = filter[key];
            result = result.filter((item) => {
                let value = item[key];
                if (filterValue.includes(value) || filterValue.length === 0) {
                    return true;
                }
            });
        });
        if (dateRange) {
            let startDate = new Date(dateRange[0]).setHours(0, 0, 0, 0);
            console.log(startDate);
            let endDate = new Date(dateRange[1]).setHours(23, 59, 59, 999);
            result = result.filter((item) => {
                let dateTime = new Date(item.createdAt).getTime();
                return dateTime >= startDate && dateTime <= endDate;
            });
        }
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
        result = result.sort((a, b) => {
            switch (sortValue) {
                case "price1":
                    return a.startingPrice > b.startingPrice ? 1 : -1;
                case "price2":
                    return a.startingPrice < b.startingPrice ? 1 : -1;
                case "date":
                    return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? 1 : -1;
                case "area1":
                    return a.constructionArea > b.constructionArea ? 1 : -1;
                case "area2":
                    return a.constructionArea < b.constructionArea ? 1 : -1;
                case "unit1":
                    return a.pricePerFoot1 > b.pricePerFoot1 ? 1 : -1;
                case "unit2":
                    return a.pricePerFoot1 < b.pricePerFoot1 ? 1 : -1;
            }
        });
        setFilteredProperties(result);
    }, [filter, minPrice, maxPrice, dateRange, sortValue, properties]);
    return (
        <div>
            <div className="bg-[#253d59] py-6">
                <div className="w-full max-w-[1000px] mx-auto px-4 md:px-0">
                    <h2 className="text-xl text-white mb-2">{t("pleaseSelect")}</h2>
                    <div className="bg-white rounded-sm px-4 py-2 grid grid-cols-1 md:grid-cols-2">
                        {json.map((item) => {
                            return (
                                <div className="flex items-center mb-4" key={item.value}>
                                    <div className="w-28">{lng === "zhcn" ? item.label2 : lng === "en" ? item.label3 : item.label1}</div>
                                    <div className="fex-1 flex gap-6">
                                        <MultiCascader
                                            labelKey={labelKey}
                                            data={item.options}
                                            searchable={false}
                                            style={{ width: 300 }}
                                            placeholder={t("pleaseSelect") + (lng === "zhcn" ? item.label2 : lng === "en" ? item.label3 : item.label1)}
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
                            label={t("minPrice")}
                            searchable={false}
                            data={sortData}
                            style={{ width: 200 }}
                            onChange={(value) => {
                                setSortValue(value);
                            }}
                            className="mb-4 md:mb-0"
                        />
                        <DateRangePicker className="mb-4 md:mb-0" placeholder={t("pleaseSelect") + t("postDate")} onChange={(value) => { setDateRange(value) }}></DateRangePicker>
                        <div className="md:flex flex-1 md:px-4 gap-4 text-white">
                            <InputGroup inside
                                className="mb-4 md:mb-0">
                                <InputGroup.Addon>{t("minPrice")}</InputGroup.Addon>
                                <InputNumber onChange={(value) => { setMinPrice(value) }}></InputNumber>
                            </InputGroup>
                            <InputGroup inside>
                                <InputGroup.Addon>{t("maxPrice")}</InputGroup.Addon>
                                <InputNumber onChange={(value) => { setMaxPrice(value) }}></InputNumber>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full max-w-[1000px] mx-auto py-8 px-4 md:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filteredProperties.map((item) => {
                            return (
                                <div key={item._id}>
                                    <Link href={"/property/" + item._id}>
                                        <div className="w-full text-black">
                                            <img height={400} width={400} className="object-cover aspect-square" src={item.coverImage.url} alt="" />
                                            <div>
                                                <p className="text-lg font-semibold mt-2">{item.traditionalChineseTitle}</p>
                                                <div className="w-12 my-2 border-b border-black"></div>
                                                <p>HK${item.startingPrice.toLocaleString()}</p>
                                                <p>{item.constructionArea.toLocaleString()}{t("feet")}</p>
                                                <p>＄{(item.startingPrice / item.constructionArea).toFixed(2)}/{t("feet")}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

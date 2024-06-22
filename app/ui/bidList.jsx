import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
const BidList = ({ lng, id }) => {
    const { t } = useTranslation(lng);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch("/api/bid/" + id + "/all")
            .then((res) => res.json())
            .then((data) => {
                setList(data);
            })
    }, [id]);
    return (
        <div className="w-full" >
            {/* {JSON.stringify(list)} */}
            <Table className="w-full my-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap">{t("bidAccount")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("bidIndex")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("bid")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("bidDateTime")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-[100px] overflow-auto" >
                    {list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-left">{item.userId && item.userId.email}</TableCell>
                            <TableCell className="text-left">{index + 1}</TableCell>
                            <TableCell className="text-left">{item.bidPrice.toLocaleString()}</TableCell>
                            <TableCell className="text-left whitespace-nowrap">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
            {t("bidListMark")}
        </div>
    );
}

export default BidList;
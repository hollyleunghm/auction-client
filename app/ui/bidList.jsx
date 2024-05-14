import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import dayjs from "dayjs";
import { useState, useEffect } from "react";
const BidList = ({ id }) => {
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
                        <TableHead className="w-12" >下拍賬戶</TableHead>
                        <TableHead className="w-12">出價次序</TableHead>
                        <TableHead className="w-12">出價</TableHead>
                        <TableHead className="w-12">出價時間</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-[100px] overflow-auto" >
                    {list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="w-12">{item.userId && item.userId.email}</TableCell>
                            <TableCell className="w-12">{index + 1}</TableCell>
                            <TableCell className="w-12">{item.bidPrice.toLocaleString()}</TableCell>
                            <TableCell className="w-12">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }</TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
            如有相同出價，以先出價的買家爲先
        </div>
    );
}

export default BidList;
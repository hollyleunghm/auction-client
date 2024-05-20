"use client";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
export default function Layout({ children }) {
    return (
        <div className="max-w-[1488px] mx-auto">
            <Navbar className="w-full" maxWidth="full">
                <NavbarBrand>
                    <p className="font-bold text-inherit">AUCTION ADMIN</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        {/* <Button as={Link} color="primary" href="#" variant="flat">
                            Sign Up
                        </Button> */}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className="flex mt-4">
                <div className="w-[300px] h-full border-small px-1 py-2 rounded-small border-default-200">
                    <Listbox
                        aria-label="Actions"
                    >
                        <ListboxItem key="new">New file</ListboxItem>
                        <ListboxItem key="copy">Copy link</ListboxItem>
                        <ListboxItem key="edit">Edit file</ListboxItem>
                        <ListboxItem key="delete" className="text-danger" color="danger">
                            Delete file
                        </ListboxItem>
                    </Listbox>
                </div>
                <div className="flex-1 h-full px-4">
                    {children}
                </div>
            </div>
        </div>

    );
}
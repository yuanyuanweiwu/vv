import { FC } from "react";
import Submenu, { SubMenuProps } from "./subMenu";
import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemsProps } from "./menuItem";

export type IMenuProps = FC<MenuItemsProps> & {
  Item: FC<MenuItemsProps>;
  SubMenu: FC<SubMenuProps>;
};
const TransMenu=Menu as IMenuProps
TransMenu.Item =MenuItem
TransMenu.SubMenu=Submenu
export default TransMenu

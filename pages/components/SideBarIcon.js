import { Flex, Link, Icon, Text } from "@chakra-ui/react";

export default function SidebarIcon({ iconName, onClick, text, mt }) {
  return (
    <Flex className="sidebar-items" mt={mt}>
      <Link onClick={onClick}>
        <Icon as={iconName} fontSize="2xl" className="sidebar-icon"></Icon>
      </Link>
      <Link onClick={onClick} _hover={{ textDecor: "none" }} ml={3}>
        <Text className="sidebar-icon-text" fontSize="l">
          {text}
        </Text>
      </Link>
    </Flex>
  );
}

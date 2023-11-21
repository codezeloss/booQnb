"use client";

import Container from "@/components/Container";
import CategoryBox from "@/components/ui/category-box";
import { usePathname, useSearchParams } from "next/navigation";
import {
  CastleIcon,
  FlameKindlingIcon,
  GemIcon,
  MountainSnowIcon,
  PalmtreeIcon,
  SnowflakeIcon,
  SparklesIcon,
  TriangleRightIcon,
  WarehouseIcon,
  WindIcon,
} from "lucide-react";
import { RiCactusLine } from "react-icons/ri";
import { GiMountainCave } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { LiaSkiingSolid } from "react-icons/lia";
import { FaSwimmingPool } from "react-icons/fa";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: WindIcon,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: SparklesIcon,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: MountainSnowIcon,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: FaSwimmingPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: PalmtreeIcon,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: TriangleRightIcon,
    description: "This property is closed to a lake!",
  },
  {
    label: "Skiing",
    icon: LiaSkiingSolid,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: CastleIcon,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: FlameKindlingIcon,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: SnowflakeIcon,
    description: "This property has arctic activities!",
  },
  {
    label: "Cave",
    icon: GiMountainCave,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: RiCactusLine,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: WarehouseIcon,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: GemIcon,
    description: "This property is luxurious!",
  },
];

export default function Categories() {
  const params = useSearchParams();
  const pathname = usePathname();

  // ** Extract category from params
  const category = params?.get("category");

  // ** Hide categories bar
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item, index) => (
          <CategoryBox
            key={index}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}

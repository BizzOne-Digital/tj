import { TabNav } from "@/components/ui/TabNav";
import { getTabItems } from "@/lib/cms";

export async function Fall3On3TabNav({ currentPath }: { currentPath: string }) {
  const items = await getTabItems("fall-3-on-3");
  return <TabNav items={items} currentPath={currentPath} />;
}

export async function YouthCampTabNav({ currentPath }: { currentPath: string }) {
  const items = await getTabItems("youth-camp");
  return <TabNav items={items} currentPath={currentPath} />;
}

export async function ElementaryTabNav({ currentPath }: { currentPath: string }) {
  const items = await getTabItems("elementary");
  return <TabNav items={items} currentPath={currentPath} />;
}

export async function AwardsTabNav({ currentPath }: { currentPath: string }) {
  const items = await getTabItems("awards");
  return <TabNav items={items} currentPath={currentPath} />;
}

export async function SelectProgramTabNav({ currentPath }: { currentPath: string }) {
  const items = await getTabItems("select-program");
  return <TabNav items={items} currentPath={currentPath} />;
}

export async function SpecialEventsTabNav({ currentPath }: { currentPath: string }) {
  const items = await getTabItems("special-events");
  return <TabNav items={items} currentPath={currentPath} />;
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from 'next/navigation';

import { protectServer } from '@/features/auth/utils';

export default async function Home() {
  await protectServer();

  redirect('/editor/project-1');
}

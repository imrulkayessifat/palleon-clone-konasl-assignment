import Navbar from "@/components/editor/navbar";
import Editor from "@/components/editor/editor";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-y-10 ">
      <Navbar />
      <Editor />
    </div>
  );
}

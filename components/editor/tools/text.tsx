import { ComponentProps } from '@/types/type';
import { Button } from '@/components/ui/button';

interface TextProps {
  setCurrentComponent: (component: ComponentProps) => void;
  components: ComponentProps[],
  setComponents: (components: ComponentProps[]) => void;
  data: string;
  rotate: number;
  moveElement: (id: string, currentInfo: ComponentProps) => void
  resizeElement: (id: string, currentInfo: ComponentProps) => void
  rotateElement: (id: string, currentInfo: ComponentProps) => void
  setFont: (data: number) => void
  setWeight: (data: number) => void
}

const Text: React.FC<TextProps> = ({
  setCurrentComponent,
  components,
  setComponents,
  rotate,
  moveElement,
  resizeElement,
  rotateElement,
  setFont,
  setWeight
}) => {

  const addText = (name: string, type: string) => {
    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: 22,
      title: "Add text",
      weight: 400,
      color: '#3c3c3d',
      setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement
    }

    setWeight(0)
    setFont(0)
    setCurrentComponent(style)
    setComponents([...components, style])
  }

  return (
    <Button onClick={() => addText('text', 'title')} className='w-full' variant={"outline"}>
      Add Text
    </Button>
  )
}

export default Text
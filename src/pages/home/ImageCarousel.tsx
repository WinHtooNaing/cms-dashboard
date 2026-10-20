// import { Card, CardContent, CardDescription } from "@/components/ui/card"
// import { CirclePlus, ImagePlus } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"

import ImageCarouselDialog from "@/components/home/ImageCarouselDialog"

// const dialogFields = [
//   {
//     id: "title",
//     label: "Title",
//     description: "Edit carousel title",
//     type: "text",
//   },
//   {
//     id: "description",
//     label: "Description",
//     description: "Edit carousel description",
//     type: "textarea",
//   },
//   {
//     id: "buttonTitle",
//     label: "Button Title",
//     description: "Edit carousel button title",
//     type: "text",
//   },
//   {
//     id: "image",
//     label: "Image",
//     description: "Upload carousel image ",
//     type: "file",
//   },
//   {
//     id: "bgImage",
//     label: "Background Image",
//     description: "Upload background image",
//     type: "file",
//   },
// ]
// export default function ImageCarousel() {
//   return (
//     <div className="mx-auto w-full max-w-7xl space-y-8">
//       <div>
//         <p className="mb-1 text-sm font-medium text-primary">
//           Home / Image Carousel
//         </p>
//         <h1 className="text-2xl font-semibold tracking-tight">
//           Image Carousel{" "}
//         </h1>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Manage your image carousel
//         </p>
//       </div>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//         {/* <Dialog>
//           <form>
//             <DialogTrigger
//               render={
//                 <Card>
//                   <CardContent className="flex cursor-pointer flex-col items-center gap-2 py-4">
//                     <CirclePlus />

//                     <CardDescription>Edit Title</CardDescription>
//                   </CardContent>
//                 </Card>
//               }
//             />
//             <DialogContent className="sm:max-w-sm">
//               <DialogHeader>
//                 <DialogTitle>Edit Title</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your image carousel
//                 </DialogDescription>
//               </DialogHeader>
//               <FieldGroup>
//                 <Field>
//                   <Label htmlFor="title">Title</Label>
//                   <Input id="title" name="title" defaultValue="" />
//                 </Field>
//               </FieldGroup>
//               <DialogFooter>
//                 <DialogClose
//                   render={<Button variant="outline">Cancel</Button>}
//                 />
//                 <Button type="submit">Save changes</Button>
//               </DialogFooter>
//             </DialogContent>
//           </form>
//         </Dialog> */}
//         {dialogFields.map((field) => (
//           <Dialog>
//             <DialogTrigger
//               render={
//                 <Card className="cursor-pointer transition-colors hover:border-primary">
//                   <CardContent className="flex flex-col items-center gap-2 py-6">
//                     {field.type === "file" ? (
//                       <ImagePlus size={24} />
//                     ) : (
//                       <CirclePlus size={24} />
//                     )}

//                     <CardDescription className="text-center">
//                       Edit {field.label}
//                     </CardDescription>
//                   </CardContent>
//                 </Card>
//               }
//             />

//             <DialogContent className="sm:max-w-md">
//               <form className="space-y-4">
//                 <DialogHeader>
//                   <DialogTitle>Edit {field.label}</DialogTitle>

//                   <DialogDescription>{field.description}</DialogDescription>
//                 </DialogHeader>

//                 {field.type === "text" && (
//                   <div className="space-y-2">
//                     <Label htmlFor={field.id} className="mb-2">
//                       {field.label}
//                     </Label>

//                     <Input
//                       id={field.id}
//                       type="text"

//                       placeholder={`Enter ${field.label.toLowerCase()}`}
//                     />
//                   </div>
//                 )}

//                 {field.type === "textarea" && (
//                   <div className="space-y-2">
//                     <Label htmlFor={field.id} className="mb-2">
//                       {field.label}
//                     </Label>

//                     <Textarea
//                       id={field.id}

//                       placeholder="Enter description"
//                       rows={4}
//                     />
//                   </div>
//                 )}

//                 {field.type === "file" && (
//                   <div className="space-y-3">
//                     <Label htmlFor={field.id}>{field.label}</Label>

//                     <Input id={field.id} type="file" accept="image/*" />
//                   </div>
//                 )}

//                 <DialogFooter>
//                   <Button type="button" variant="outline">
//                     Cancel
//                   </Button>

//                   <Button type="submit">Save Changes</Button>
//                 </DialogFooter>
//               </form>
//             </DialogContent>
//           </Dialog>
//         ))}
//       </div>
//     </div>
//   )
// }

export const dialogFields = [
  {
    id: "title",
    label: "Title",
    description: "Edit carousel title",
    type: "text",
  },
  {
    id: "description",
    label: "Description",
    description: "Edit carousel description",
    type: "textarea",
  },
  {
    id: "buttonTitle",
    label: "Button Title",
    description: "Edit carousel button title",
    type: "text",
  },
  {
    id: "image",
    label: "Image",
    description: "Upload carousel image",
    type: "file",
  },
  {
    id: "bgImage",
    label: "Background Image",
    description: "Upload background image",
    type: "file",
  },
]

// Reusable Dialog Form Component for individual fields

export default function ImageCarousel() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div>
        <p className="mb-1 text-sm font-medium text-primary">
          Home / Image Carousel
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Image Carousel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your image carousel
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {dialogFields.map((field) => (
          <ImageCarouselDialog key={field.id} field={field} />
        ))}
      </div>
    </div>
  )
}

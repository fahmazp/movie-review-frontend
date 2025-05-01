import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/config/axiosInstance";
import toast from "react-hot-toast";

const AddMovieDialog = ({ onMovieAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseDate: "",
    duration: "",
    media_type: "",
    cast: "",
    directedBy: "",
    videos: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image!");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "cast") {
        val.split(",").forEach((c) => data.append("cast", c.trim()));
      } else {
        data.append(key, val);
      }
    });

    setLoading(true);
    try {
      const res = await axiosInstance.post("/movie/add-movie", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Movie added Successfully!");
      onMovieAdded(); // trigger reload in parent
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 bg-yellow-500 text-black hover:bg-yellow-600">+ Add Movie</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add a New Movie</DialogTitle>
          <DialogDescription>Fill in the details and click save to add the movie.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {[
            ["Title", "title"],
            ["Description", "description"],
            ["Genre", "genre"],
            ["Release Date", "releaseDate", "date"],
            ["Duration", "duration"],
            ["Media Type (film/tv_show)", "media_type"],
            ["Cast (comma-separated)", "cast"],
            ["Directed By", "directedBy"],
            ["Video Link", "videos"],
          ].map(([label, name, type = "text"]) => (
            <div key={name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={name} className="text-right">{label}</Label>
              <Input id={name} name={name} type={type} value={formData[name]} onChange={handleChange} className="col-span-3" required={["title", "description", "genre", "releaseDate", "duration", "media_type"].includes(name)} />
            </div>
          ))}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" onChange={handleChange} className="col-span-3" required />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Movie"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;

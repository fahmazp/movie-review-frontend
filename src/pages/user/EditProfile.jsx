import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const EditProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false); // control dialog open/close
  const [fieldValue, setFieldValue] = useState(""); // store temp input

  // Fetch profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUserDetails(response.data.data);
        setFormData(response.data.data);
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (field, value) => {
    console.log(`Changing field: ${field} =>`, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePic: file }));
  };

  const handleDialogEdit = (field) => {
    setEditingField(field);
    setFieldValue(formData[field] || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const updateForm = new FormData();

      if (editingField === "profilePic") {
        updateForm.append("profilePic", formData.profilePic);
      } else {
        updateForm.append(editingField, fieldValue);
      }

      const response = await axiosInstance.put("/user/profile-update", updateForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server responded:", response.data)

      toast.success("Profile updated successfully!");
      setUserDetails(response.data.data);
      setFormData(response.data.data);
      setDialogOpen(false);
      setEditingField(null);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error.response?.data?.message || error.message);
    }
  };

  if (!userDetails) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 px-4">
      <nav aria-label="Breadcrumb">
            <Link to="/user/profile" className="flex items-center space-x-1">
            <div>
              <ChevronLeft size={20} className="mr-0.5 text-black bg-zinc-300 rounded-xs" />
            </div>
              <span className="text-[#F8B319] text-lg font-semibold hover:text-gray-600 dark:hover:text-gray-200">Back</span>
            </Link>
      </nav>
    <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

    <div className="overflow-hidden rounded-lg ring-1 ring-black/10 shadow-md">
      <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {[
            { label: "Name", field: "name" },
            { label: "Email", field: "email" },
            { label: "Mobile", field: "mobile" },
            { label: "Profile Picture", field: "profilePic" },
          ].map(({ label, field }) => (
            <tr key={field}>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{label}</td>
              <td className="px-6 py-4 text-sm text-gray-600 font-semibold">
                {field === "profilePic" ? (
                  userDetails.profilePic ? (
                    <img
                      src={userDetails.profilePic}
                      alt="Profile"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <span className="italic text-gray-400">No profile picture</span>
                  )
                ) : (
                  userDetails[field]
                )}
              </td>
              <td className="px-6 py-4 text-sm text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleDialogEdit(field)}
                  className="text-sm font-semibold px-1.5 text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-900 rounded-xs"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Dialog Box */}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {editingField}</DialogTitle>
          <DialogDescription>
            Make changes to your {editingField}. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {editingField === "profilePic" ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePic" className="text-right">
                Upload
              </Label>
              <Input
                id="profilePic"
                type="file"
                className="col-span-3"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={editingField} className="text-right capitalize">
                {editingField}
              </Label>
              <Input
                id={editingField}
                className="col-span-3"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
)
};

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Update the path to the correct location
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Shimmer from "@/components/ui/Shimmer";

export default function Home() {
  const [nodeModulesPaths, setNodeModulesPaths] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fetch node_modules paths
  const fetchNodeModulesPaths = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/scan");
      setNodeModulesPaths(res.data.results);
    } catch (error) {
      console.error("Error fetching node_modules paths:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNodeModulesPaths();
  }, []);

  // Toggle selection for a given path
  const handleSelect = (path) => {
    setSelectedPaths((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  // // Open folder in File Explorer
  // const handleRevealInExplorer = (path) => {
  //   window.open(`file://${path.replace(/\\/g, "/")}`, "_blank");
  // };

  const handleRevealInExplorer = async (folderPath) => {
    try {
      await axios.post("/api/reveal", { folderPath });
    } catch (error) {
      console.error("Error opening folder:", error);
    }
  };

  // Handle deletion with progress bar
  const handleDelete = async () => {
    setDeleting(true);
    setProgress(0);
    const step = 100 / selectedPaths.length;

    for (let i = 0; i < selectedPaths.length; i++) {
      try {
        await axios.post("/api/delete", { paths: [selectedPaths[i]] });
        setProgress((prev) => prev + step);
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }

    await fetchNodeModulesPaths();
    setDeleting(false);
    setDeleteDialogOpen(false);
    setSelectedPaths([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Node Modules Cleaner
      </h1>

      {loading ? (
        // <p className="text-center">Loading...</p>
        <Shimmer />
      ) : (
        <div className="space-y-4">
          {nodeModulesPaths.map((path, index) => (
            <Card key={index} className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedPaths.includes(path)}
                  onCheckedChange={() => handleSelect(path)}
                />
                <p className="truncate w-160">{path}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevealInExplorer(path)}
                >
                  Reveal in Explorer
                </Button>
              </div>
            </Card>
          ))}

          {selectedPaths.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              className="fixed bottom-4 right-4"
            >
              Delete Node Modules
            </Button>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p>Are you sure you want to delete the selected node_modules?</p>

          {deleting && <Progress value={progress} />}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// export default function Home() {
//   const [nodeModulesPaths, setNodeModulesPaths] = useState([]);
//   const [selectedPaths, setSelectedPaths] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   // Fetch node_modules paths
//   const fetchNodeModulesPaths = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/api/scan");
//       setNodeModulesPaths(res.data.results);
//     } catch (error) {
//       console.error("Error fetching node_modules paths:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchNodeModulesPaths();
//   }, []);

//   // Handle selection toggle
//   const handleSelect = (path) => {
//     setSelectedPaths((prev) =>
//       prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
//     );
//   };

//   // Handle delete operation
//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await axios.post("/api/delete", { paths: selectedPaths });
//       fetchNodeModulesPaths();
//       setSelectedPaths([]);
//     } catch (error) {
//       console.error("Error deleting node_modules:", error);
//     }
//     setDeleting(false);
//     setDeleteDialogOpen(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         Node Modules Cleaner
//       </h1>
//       {loading ? (
//         <p className="text-center">Scanning...</p>
//       ) : (
//         <>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Select</TableHead>
//                 <TableHead>Path</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {nodeModulesPaths.map((path, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedPaths.includes(path)}
//                       onCheckedChange={() => handleSelect(path)}
//                     />
//                   </TableCell>
//                   <TableCell>{path}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {selectedPaths.length > 0 && (
//             <Button
//               variant="destructive"
//               className="mt-4"
//               onClick={() => setDeleteDialogOpen(true)}
//             >
//               Delete Selected Node Modules
//             </Button>
//           )}
//         </>
//       )}

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//           </DialogHeader>
//           <p>
//             Are you sure you want to delete the selected node_modules folders?
//             This action cannot be undone.
//           </p>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//               disabled={deleting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleDelete}
//               disabled={deleting}
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

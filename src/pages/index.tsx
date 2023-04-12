import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useState } from "react";
import { Alert } from "@mui/material";

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const data: RenderTree = {
  id: "1",
  name: "P: NONE ID: 1",
  children: [
    {
      id: "2",
      name: "P: 1 ID: 2",
    },
    {
      id: "3",
      name: "P: 1 ID: 3",
      children: [
        {
          id: "4",
          name: "P: 3 ID: 4",
        },
      ],
    },
  ],
};

const testData: RenderTree = {
  id: "1",
  name: "P: NONE ID: 1",
  children: [
    {
      id: "2",
      name: "P: 1 ID: 2",
    },
    {
      id: "3",
      name: "P: 1 ID: 3",
      children: [
        {
          id: "4",
          name: "P: 3 ID: 4",
        },
      ],
    },
  ],
};

const findNodeById: any = (obj: RenderTree, id: string) => {
  if (obj.id === id) return obj;
  if (obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      const foundNode = findNodeById(obj.children[i], id);
      if (foundNode) return foundNode;
    }
  }
  return null;
};

const countNodes = (node: RenderTree) => {
  let count = 1;

  if (node.children) {
    for (let child of node.children) {
      count += countNodes(child);
    }
  }
  return count;
};

export default function Home() {
  const [treeData, setTreeData] = useState(data);
  const [PID, setPID] = useState("");
  const [isExist, setIsExist] = useState(true);

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setPID(event.target.value);
  };

  const handleClick = () => {
    setIsExist(true);
    let data = treeData;
    const new_data = addChild(data, `${PID}`);
    setTreeData(new_data);
    setPID("");
  };

  const addChild = (obj: RenderTree, pid: string) => {
    const parent = findNodeById(obj, pid);

    if (parent) {
      const randomId = `${countNodes(data) + 1}`;
      if (parent.children) {
        parent.children.push({
          id: randomId,
          name: `P: ${parent.id} ID: ${randomId}`,
        });
      } else {
        parent.children = [
          {
            id: randomId,
            name: `P: ${parent.id} ID: ${randomId}`,
          },
        ];
      }
    } else {
      setIsExist(false);
    }
    return obj;
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div className="mt-4 ml-4">
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["1"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 410, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        className="rounded border mb-4"
      >
        {renderTree(treeData)}
      </TreeView>
      <label>Add Node To:</label>
      <input
        type="number"
        className="ml-4 mr-auto p-1 shadow text-xs"
        placeholder="PID"
        value={PID}
        onChange={handleChange}
      />
      <br />
      {!isExist ? (
        <Alert severity="error" className="w-[270px] mt-2">
          This PID is not exist!
        </Alert>
      ) : (
        ""
      )}
      <button className="mt-2 px-2 py-1 mr-2 button" onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

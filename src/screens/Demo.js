import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
// treeData.js

export const treeData = [
  {
    id: 1,
    name: 'Parent 1',
    children: [
      {
        id: 2,
        name: 'Child 1',
        children: [
          {
            id: 3,
            name: 'Grandchild 1',
          },
        ],
      },
      {
        id: 4,
        name: 'Child 2',
      },
    ],
  },
  {
    id: 5,
    name: 'Parent 2',
    children: [
      {
        id: 6,
        name: 'Child 3',
      },
    ],
  },
];

export default function Demo() {
  // TreeNode.js

  const TreeNode = ({node}) => {
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
      setExpanded(!expanded);
    };

    return (
      <View style={styles.nodeContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.node}>
          <Text style={styles.nodeText}>{node.name}</Text>
        </TouchableOpacity>
        {expanded && node.children && (
          <View style={styles.childrenContainer}>
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        {treeData.map(node => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nodeContainer: {
    marginLeft: 10,
  },
  node: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 2,
  },
  nodeText: {
    fontSize: 16,
  },
  childrenContainer: {
    marginLeft: 15,
  },
});

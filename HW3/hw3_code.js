// Student name: Alexander Lao
// Student ID: 11481444
// NOTE: A lot of the insertion and
//       removal cases for the Set489
//       were adapted from the rules on Wikipedia.

//       One removal case does not work. Explained in further
//       detail on line 396.

// Don't forget to include the .js file for the base class along with
// this one when submitting to Blackboard!

function Set489 (compareFunc)
{
    BST.call (this, compareFunc);
}

// do this to inherit from the base class
Set489.prototype = Object.create (BST.prototype);

Set489.prototype.add = function (value)
{
    // add the value with the normal BST insertion
    var newNode = BST.prototype.addNode.call (this, value);

    // balance only if the value was added correctly
    if (newNode)
    {
        // balance the newly added node
        this.balance (newNode);

        return true;
    }

    return false;
}

// returns the grandparent of a node if it exists
Set489.prototype.getGrandparent = function (node)
{
    if ((node != null) && (node.parent != null))
    {
        return node.parent.parent;
    }
    else
    {
        return null;
    }
}

// returns the uncle of a node if it exists
Set489.prototype.getUncle = function (node)
{
    // get the grandparent node
    var grandparent = this.getGrandparent (node);

    // if the grandparent doesn't exist
    if (grandparent == null)
    {
        // the uncle doesn't exist
        return null;
    }

    // check which side of the grandparent the node is on
    // if we're on the left
    if (grandparent.left == node.parent)
    {
        // the uncle is on the right
        return grandparent.right;
    }
    else
    {
        // otherwise the uncle is on the left
        return grandparent.left;
    }
}

// used for all general cases
Set489.prototype.rotateLeft = function (node)
{
    // check if we're rotating the root
    if (node == this.m_root)
    {
        // keep a reference to the node and it's child's left
        var savedParent = node;
        var savedLeft = node.right.left;

        // do the rotation and update the root
        node.right.left = savedParent
        savedParent.parent = node.right;
        savedParent.right = savedLeft;
        this.m_root = savedParent.parent;
        this.m_root.parent = null;
    }
    else
    {
        // keep a reference to the node, it's child's left
        // and the grandparent for simplicity
        var savedParent = node;
        var savedLeft = node.right.left;
        var grandparent = node.parent;

        // check which side of the grandparent we're on
        // on the left
        if (grandparent.left == node)
        {
            // update the grandparent's left
            grandparent.left = node.right;
        }
        else
        {
            // otherwise we're on the right so
            // update the grandparent's right
            grandparent.right = node.right;
        }
        
        node.right.left = savedParent;
        node.right.parent = grandparent;
        savedParent.parent = node.right;
        savedParent.right = savedLeft;
    }
}

// used for case 5
Set489.prototype.rotateLeftGrandparent = function (node)
{
    // check if we're rotating the root
    if (node == this.m_root)
    {
        // keep a reference to the node and it's child's left
        var savedParent = node;
        var savedLeft = node.right.left;

        // do the rotation and update the root
        node.right.left = savedParent
        savedParent.parent = node.right;
        savedParent.right = savedLeft;
        this.m_root = savedParent.parent;
        this.m_root.parent = null;
    }
    else
    {
        // keep a reference to the node, it's child's left
        // and the grandparent for simplicity
        var savedParent = node;
        var savedLeft = node.right.left;
        var grandparent = node.parent;

        // check which side of the grandparent we're on
        // on the left
        if (grandparent.left == node)
        {
            // update the grandparent's left
            grandparent.left = node.right;
        }
        else
        {
            // otherwise we're on the right so
            // update the grandparent's right
            grandparent.right = node.right;
        }

        
        node.right.left = savedParent;
        node.right.parent = savedParent.parent;
        savedParent.parent = node.right;
        savedParent.right = savedLeft;
    }
}

// used for all general cases
Set489.prototype.rotateRight = function (node)
{
    // check if we're rotating the root
    if (node == this.m_root)
    {
        // keep a reference to the node and it's child's right
        var savedParent = node;
        var savedRight = node.left.right;

        // do the rotation and update the root
        node.left.right = savedParent
        savedParent.parent = node.left;
        savedParent.left = savedRight;
        this.m_root = savedParent.parent;
        this.m_root.parent = null;
    }
    else
    {
        // keep a reference to the node, it's child's right
        // and the grandparent for simplicity
        var savedParent = node;
        var savedRight = node.left.right;
        var grandparent = node.parent;

        // check which side of the grandparent we're on
        // on the left
        if (grandparent.left == node)
        {
            // update the grandparent's left
            grandparent.left = node.left;
        }
        else
        {
            // otherwise we're on the right so
            // update the grandparent's right
            grandparent.right = node.left;
        }

        node.left.right = savedParent;
        node.left.parent = grandparent;
        savedParent.parent = node.left;
        savedParent.left = savedRight;
    }
}

// used for case 5
Set489.prototype.rotateRightGrandparent = function (node)
{
    // check if we're rotating the root
    if (node == this.m_root)
    {
        // keep a reference to the node and it's child's right
        var savedParent = node;
        var savedRight = node.left.right;

        // do the rotation and update the root
        node.left.right = savedParent
        savedParent.parent = node.left;
        savedParent.left = savedRight;
        this.m_root = savedParent.parent;
        this.m_root.parent = null;
    }
    else
    {
        // keep a reference to the node, it's child's right
        // and the grandparent for simplicity
        var savedParent = node;
        var savedRight = node.left.right;
        var grandparent = node.parent;

        // check which side of the grandparent we're on
        // on the left
        if (grandparent.left == node)
        {
            // update the grandparent's left
            grandparent.left = node.left;
        }
        else
        {
            // otherwise we're on the right so
            // update the grandparent's right
            grandparent.right = node.left;
        }

        node.left.right = savedParent;
        node.left.parent = savedParent.parent;
        savedParent.parent = node.left;
        savedParent.left = savedRight;
    }
}

Set489.prototype.balance = function (node)
{
    // start with the first balance case
    // each case falls through to the next one
    this.balanceCaseOne (node);
}

Set489.prototype.balanceCaseOne = function (node)
{
    // Case 1: The node is the root
    if (node == this.m_root)
    {
        // paint it black
        node.color = "black";
        return true;
    }
    else
    {
        // otherwise fall through to case two
        this.balanceCaseTwo (node);
    }
}

Set489.prototype.balanceCaseTwo = function (node)
{
    // Case 2: The parent is black
    if (node.parent.color == "black")
    {
        // do nothing
        return true;
    }
    else
    {
        // otherwise fall through to case three
        this.balanceCaseThree (node);
    }
}

Set489.prototype.balanceCaseThree = function (node)
{
    // get the uncle node
    var uncle = this.getUncle (node);

    // Case 3: The parent and uncle are red
    if ((uncle != null) && (uncle.color == "red"))
    {
        // change the parent and uncle to black
        node.parent.color = "black";
        uncle.color = "black";

        // change the grandparent to red
        var grandparent = this.getGrandparent(node);
        grandparent.color = "red";

        // balance the grandparent
        this.balance (grandparent);
    }
    else
    {
        // otherwise fall through to case four
        this.balanceCaseFour (node);
    }
}

Set489.prototype.balanceCaseFour = function (node)
{
    // get the grandparent node
    var grandparent = this.getGrandparent(node);

    // Case 4: Zig-zag
    // find out which side we're on relative to the grandparent

    // on the left side of the grandparent
    if ((node == node.parent.right) && (node.parent == grandparent.left))
    {
        // need to rotate left
        this.rotateLeft (node.parent);

        // update the node to its left
        node = node.left;
    }
    // on the right side of the grandparent
    else if ((node == node.parent.left) && (node.parent == grandparent.right))
    {
        // need to rotate right
        this.rotateRight (node.parent);
        
        // update the node to its right
        node = node.right;
    }

    // fall through to case five
    this.balanceCaseFive (node);
}

Set489.prototype.balanceCaseFive = function (node)
{
    // Case 5: Linear
    
    // get the grandparent
    var grandparent = this.getGrandparent(node);

    // paint the parent black and grandparent red
    node.parent.color = "black"
    grandparent.color = "red";

    // the way we need to rotate is dependent on the
    // node's orientation with respect to the grandparent
    if (node == node.parent.left)
    {
        // rotate right
        this.rotateRightGrandparent (grandparent);
    }
    else
    {
        // rotate left
        this.rotateLeftGrandparent (grandparent);
    }
}

Set489.prototype.remove = function (value)
{
    // first check if the node even exists in the tree
    var node = BST.prototype.getNode.call (this, value);

    if (node == null) return false;

    // if the node has two children
    if ((node.left) && (node.right))
    {
        // just call the regular BST remove
        return BST.prototype.remove.call (this, value);

        // COULDN'T GET THE PART BELOW TO WORK
        // the linked list nodes are ruined
        // when a swap is performed causing multiple
        // errors in the auto grader. Therefore a rotate
        // is not perfomed which causes the discrepancy
        // between the getLevel () results for test 61.

        // get the max value of the left subtree
        var maxLeft = BST.prototype.maxHelper (node.left);

        // recursively remove the maxLeft
        this.remove (maxLeft);

        // replace the node's value with the maxLeft
        this.fixLinks (node);
        node.value = maxLeft;
    }
    // if the node is red (implicitly means has at most one child)
    else if (node.color == "red")
    {
        // just call the regular BST remove
        return BST.prototype.remove.call (this, value);
    }
    // if the node only has one child
    else if (this.hasOneChild (node))
    {
        // get the child
        var child = this.getChild (node);

        // replace the node with the child
        this.replaceNode (node, child);

        // if the child is red
        if (child.color == "red")
        {
            // change it to black
            child.color = "black";
        }
        else
        {
            // otherwise we need to go through the removal process
            this.prepareForRemove (child);
        }
    }
    // otherwise the node is black
    else
    {
        // prepare to remove the node
        this.prepareForRemove(node);

        // then call the regular BST remove
        return BST.prototype.remove.call(this, value);
    }
}

// checks if a node has only one child
Set489.prototype.hasOneChild = function (node)
{
    if (((node.left) && !(node.right)) ||
        (!(node.left) && (node.right)))
    {
        return true;
    }

    return false;
}

// returns the child of a node with only one child
Set489.prototype.getChild = function (node)
{
    if (node.left) return node.left;
    else return node.right;
}

// replaces a node's spot with it's child
Set489.prototype.replaceNode = function (node, child)
{
    // get the parent node
    var parent = node.parent;

    // check which side the node is on
    // with respect to the parent
    // on the left
    if (parent.left == node)
    {
        parent.left = child;
        child.parent = parent;
    }
    // otherwise we're on the right
    else
    {
        parent.right = child;
        child.parent = parent;
    }

    // fix the linked list links
    this.fixLinks (node);
}

Set489.prototype.fixLinks = function (node)
{
    // fix the linked list links
    // check if the node is m_first
    if (node == this.m_first)
    {
        this.m_first = node.next;
        node.next.previous = null;
    }
    // check if the node is the last node
    else if (node == this.m_last)
    {
        this.m_last = node.previous;
        node.previous.next = null;
    }
    else
    {
        // link the two nodes sandwiching the node
        node.previous.next = node.next;
        node.next.previous = node.previous;
    }
}

// returns the sibling of a node if it exists
Set489.prototype.getSibling = function (node)
{
    // check if a sibling exists
    if ((node == null) || (node.parent == null))
    {
        // the sibling doesn't exist
        return null;
    }

    // check which side of the parent we're on
    // on the left side
    if (node == node.parent.left)
    {
        // return the right child of the parent
        return node.parent.right;
    }
    else
    {
        // otherwise we're on the left so return
        // the left child of the parent
        return node.parent.left;
    }
}

Set489.prototype.prepareForRemove = function (node)
{
    // start with the first remove case
    // each case falls through to the next one
    this.removeCaseOne (node);
}

Set489.prototype.removeCaseOne = function (node)
{
    // Case 1: the node is the root just return
    // otherwise
    if (node.parent != null)
    {
        // fall through to case two
        this.removeCaseTwo (node);
    }
}

Set489.prototype.removeCaseTwo = function (node)
{
    // get the node's sibling
    var sibling = this.getSibling (node);

    // Case 2: the sibling is red
    if (sibling.color == "red")
    {
        // make the sibling black and the parent red
        node.parent.color = "red";
        sibling.color = "black";

        // rotate on P
        if (node == node.parent.left)
        {
            this.rotateLeft (node.parent);
        }
        else
        {
            this.rotateRight (node.parent);
        }
    }

    // fall through to case three
    this.removeCaseThree (node);
}

Set489.prototype.removeCaseThree = function (node)
{
    // get the node's sibling
    var sibling = this.getSibling(node);

    // Case 3: the parent, sibling, and sibling's children
    // are all black
    if ((node.parent.color == "black") && (sibling.color == "black") &&
        (sibling.left.color == "black") && (sibling.right.color == "black"))
    {
        // make the sibling red and let the parent
        // fall through the remove cases
        sibling.color = "red";
        this.removeCaseOne (node.parent);
    }
    else
    {
        // fall through to case four
        this.removeCaseFour (node);
    }
}

Set489.prototype.removeCaseFour = function (node)
{
    // get the node's sibling
    var sibling = this.getSibling (node);

    if (sibling.left && sibling.right)
    {
        // Case 4: the sibling and sibling's children are black
        // and the parent is red
        if ((node.parent.color == "red") && (sibling.color == "black") &&
            (sibling.left.color == "black") && (sibling.right.color == "black"))
        {
            // paint the parent black and the sibling red
            sibling.color == "red";
            node.parent.color == "black";
        }
    }
    else
    {
        // otherwise fall through to case five
        this.removeCaseFive (node);
    }
}

Set489.prototype.removeCaseFive = function (node)
{
    // get the node's sibling
    var sibling = this.getSibling(node);

    // Case 5: the sibling is black, the sibling's
    // left child is red, the sibling's right child
    // is black, and the node is the left child of the parent
    if (sibling.color == "black")
    {
        if ((node == node.parent.left) && (sibling.right.color == "black") &&
            (sibling.left.color == "red"))
        {
            // paint the sibling red, the sibling's left
            // child black, then rotate right about the sibling
            sibling.color == "red";
            sibling.left.color == "black";
            this.rotateRight (sibling);
        }
        // otherwise the opposite of the previous conditional
        else if ((node == node.parent.right) && (sibling.left.color == "black") &&
                 (sibling.right.color == "red"))
        {
            // paint the sibling red, the sibling's right
            // child black, then rotate left about the sibling
            sibling.color = "red";
            sibling.right.color = "black";
            this.rotateLeft (sibling);
        }
    }

    // fall through to case six
    this.removeCaseSix (node);
}

Set489.prototype.removeCaseSix = function (node)
{
    // get the node's sibling
    var sibling = this.getSibling(node);

    // Case 6: whatever's left

    // paint the sibling's color to the parent's color
    // then paint the parent black
    sibling.color = node.parent.color;
    node.parent.color = "black";

    // check which side of the parent we're on
    // on the left
    if (node == node.parent.left)
    {
        // paint the sibling's right child black
        // then rotate left about the parent
        sibling.right.color = "black";
        this.rotateLeft (node.parent);
    }
    // otherwise we're on the right
    else
    {
        // paint the sibling's left child black
        // then rotate right about the parent
        sibling.left.color = "black";
        this.rotateRight (node.parent);
    }
}
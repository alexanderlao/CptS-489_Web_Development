// Student name: Alexander Lao
// Student ID: 11481444

// global variables to help with recursion
var count;
var result;

function node (newValue)
{
    this.value = newValue;
    this.left = null;
    this.right = null;
    this.next = null;
    this.previous = null;
    this.parent = null;
    this.color = null;
}

function BST ()
{
    this.m_root = null;
    this.m_first = null;
    this.m_last = null;
}

// add returns true or false if the node was added
// successfully or not
BST.prototype.add = function (value)
{
    var addedNode = this.addNode(value);

    if (addedNode != null) return true;
    else return false;
}

// addNode returns a reference to the node we just added
BST.prototype.addNode = function (value)
{
    // check if the root is null
    if (this.m_root == null)
    {
        // initialize the root
        this.m_root =
        {
            left: null, right: null, value: value,
            next: null, previous: null, parent: null,
            color: "red"
        };

        // set the head and tail of the linked list to the root
        // and keep track of the last node added
        this.m_first = this.m_root;
        this.m_last = this.m_root;

        return this.m_root;
    }

    // start at the root
    var currentNode = this.m_root;

    while (true)
    {
        // going left
        if (currentNode.value > value)
        {
            // if we found an empty spot to the left
            if (currentNode.left == null)
            {
                // add in the new node
                currentNode.left =
                {
                    left: null, right: null, value: value,
                    next: null, previous: this.m_last, parent: currentNode,
                    color: "red"
                };

                // set the last node's next to the new node
                // that we just added in
                this.m_last.next = currentNode.left;

                // update the last node added
                this.m_last = currentNode.left;

                return currentNode.left;
            }

            // otherwise traverse to the left
            currentNode = currentNode.left;
        }
        // going right
        else if (currentNode.value < value)
        {
            // if we found an empty spot to the right
            if (currentNode.right == null)
            {
                // add in the new node
                currentNode.right =
                {
                    left: null, right: null, value: value,
                    next: null, previous: this.m_last, parent: currentNode,
                    color: "red"
                };

                // set the last node's next to the new node
                // that we just added in
                this.m_last.next = currentNode.right;

                // update the last node added
                this.m_last = currentNode.right;

                return currentNode.right;
            }

            // otherwise traverse to the right
            currentNode = currentNode.right;
        }
        // otherwise it's a duplicate
        else
        {
            return null;
        }
    }
}

BST.prototype.count = function ()
{
    // reset the global count variable to 0
    count = 0;

    // call the countHelper function
    this.countHelper (this.m_root);

    return count;
}

// in-order traversal to count each node
BST.prototype.countHelper = function (node)
{
    if (node != null)
    {
        // traverse to the left
        this.countHelper(node.left);

        // increment the counter
        count++;

        // traverse to the right
        this.countHelper(node.right);
    }
}

BST.prototype.getLevel = function (value)
{
    // check if the value is in the tree
    if (!(this.search(value))) return -1;

    // variable to keep track of the levels
    var level = 0;

    // start at the root
    var currentNode = this.m_root;

    while (true)
    {
        // going left
        if (currentNode.value > value)
        {
            // increment the level counter
            level++;

            // traverse to the left
            currentNode = currentNode.left;
        }
        // going right
        else if (currentNode.value < value)
        {
            // increment the level counter
            level++;

            // otherwise traverse to the right
            currentNode = currentNode.right;
        }
        // otherwise we found the value
        else
        {
            return level;
        }
    }
}

BST.prototype.getMax = function ()
{
    // start at the root
    var currentNode = this.m_root;

    // if the root is empty return undefined
    if (currentNode == null) return undefined;

    // keep traversing to the right
    while (currentNode.right != null) currentNode = currentNode.right;

    return currentNode.value;
}

BST.prototype.getMin = function ()
{
    // start at the root
    var currentNode = this.m_root;

    // if the root is empty return undefined
    if (currentNode == null) return undefined;

    // keep traversing to the left
    while (currentNode.left != null) currentNode = currentNode.left;

    return currentNode.value;
}

BST.prototype.has = function (value)
{
    // call the search function
    return this.search (value);
}

// returns true if we find the value
// false otherwise
BST.prototype.search = function (value)
{
    // check if the root is null
    if (this.m_root == null)
    {
        return false;
    }

    // start at the root
    var currentNode = this.m_root;

    while (true)
    {
        // going left
        if (currentNode.value > value)
        {
            // if we found an empty spot to the left
            if (currentNode.left == null)
            {
                // the value is not here
                return false;
            }

            // otherwise traverse to the left
            currentNode = currentNode.left;
        }
        // going right
        else if (currentNode.value < value)
        {
            // if we found an empty spot to the right
            if (currentNode.right == null)
            {
                // the value is not here
                return false;
            }

            // otherwise traverse to the right
            currentNode = currentNode.right;
        }
        // otherwise we found the value
        else
        {
            return true;
        }
    }
}

// removes a node from the BST while
// preserving the linked list links
BST.prototype.remove = function (value)
{
    // check if the root is null
    if (this.m_root == null)
    {
        return false;
    }

    // start at the root and keep a reference to the parent
    var currentNode = this.m_root;
    var parentNode = null;

    while (true)
    {
        // going left
        if (currentNode.value > value)
        {
            // if we found an empty spot to the left
            if (currentNode.left == null)
            {
                // the value is not here
                return false;
            }

            // otherwise traverse to the left
            parentNode = currentNode;
            currentNode = currentNode.left;
        }
        // going right
        else if (currentNode.value < value)
        {
            // if we found an empty spot to the right
            if (currentNode.right == null)
            {
                // the value is not here
                return false;
            }

            // otherwise traverse to the right
            parentNode = currentNode;
            currentNode = currentNode.right;
        }
        // otherwise we found the value
        else
        {
            // special case: deleting the root with no children
            if ((currentNode == this.m_root) && (!currentNode.left)
                && (!currentNode.right))
            {
                // just clear the root
                this.m_root = this.m_first = this.m_last = null;

                return true;
            }
            // deleting the root with a left child only
            else if ((currentNode == this.m_root) && (currentNode.left)
                     && (!currentNode.right))
            {
                // update the linked list links
                this.m_root.next.previous = null;
                this.m_first = this.m_root.next;

                // set the root to the left child
                this.m_root = currentNode.left;

                return true;
            }
            // deleting the root with a right child only
            else if ((currentNode == this.m_root) && (!currentNode.left)
                     && (currentNode.right))
            {
                // update the linked list links
                this.m_root.next.previous = null;
                this.m_first = this.m_root.next;

                // set the root to the right child
                this.m_root = currentNode.right;

                return true;
            }
            // check how many children it has
            // no children
            else if (currentNode.left == null && currentNode.right == null)
            {
                // update the linked list links
                // check if we're deleting m_last
                if (currentNode == this.m_last)
                {
                    currentNode.previous.next = null;
                    this.m_last = currentNode.previous;
                }
                else if (currentNode == this.m_first)
                {
                    this.m_first = currentNode.next;
                    currentNode.next.previous = null;
                }
                else
                {
                    // link the two nodes sandwiching the currentNode
                    currentNode.previous.next = currentNode.next;
                    currentNode.next.previous = currentNode.previous;
                }

                // check if the node is the left or right child
                // of the parent
                // left child
                if (currentNode == parentNode.left)
                {
                    parentNode.left = null;
                }
                // right child
                else
                {
                    parentNode.right = null;
                }

                // just remove the node
                currentNode == null;

                return true;
            }
            // only a left child
            else if (currentNode.left && currentNode.right == null)
            {
                // fix the linked list links
                // link the two nodes sandwiching the currentNode
                currentNode.previous.next = currentNode.next;
                currentNode.next.previous = currentNode.previous;

                // replace the currentNode with the left child
                var temp = currentNode.left;

                // check if the node is the left or right child
                // of the parent
                // left child
                if (currentNode == parentNode.left)
                {
                    parentNode.left = temp;
                    temp.parent = parentNode;
                }
                // right child
                else
                {
                    parentNode.right = temp;
                    temp.parent = parentNode;
                }

                return true;
            }
            // only a right child
            else if (currentNode.left == null && currentNode.right)
            {
                // fix the linked list links
                // link the two nodes sandwiching the currentNode
                currentNode.previous.next = currentNode.next;
                currentNode.next.previous = currentNode.previous;

                // replace the currentNode with the right child
                var temp = currentNode.right;

                // check if the node is the left or right child
                // of the parent
                // left child
                if (currentNode == parentNode.left)
                {
                    parentNode.left = temp;
                    temp.parent = parentNode;
                }
                // right child
                else
                {
                    parentNode.right = temp;
                    temp.parent = parentNode;
                }

                return true;
            }
            // two children
            else
            {
                // get the maximum value of the left subtree
                var maxLeft = this.maxHelper(currentNode.left);
                var flag = false;

                // before we remove the maxLeft
                // get a reference to its previous node so
                // we can fix the links after we swap
                var oldPrevious = this.findPrevious (maxLeft);

                // check if the maxLeft is the last node added
                if (maxLeft == this.m_last.value)
                {
                    // set the flag to true
                    flag = true;
                }

                // remove the old node that contains the maxLeft
                this.remove (maxLeft);

                // replace the currentNode's value with the maxLeft value
                currentNode.value = maxLeft;

                // fix the replaced node's links
                // need to check for black nodes because
                // black nodes will go into a recursive call
                // and we don't want to fix the linked list links twice
                if (currentNode.previous != null &&
                    currentNode.color != "black")
                {
                    // preserving the removed node's links
                    currentNode.previous.next = currentNode.next;
                    currentNode.next.previous = currentNode.previous;

                    // preserving the swapped node's links
                    oldPrevious.next.previous = currentNode;
                    currentNode.next = oldPrevious.next;
                    oldPrevious.next = currentNode;
                    currentNode.previous = oldPrevious;
                }
                // if the currentNode's previous is null
                // case: swapped with the root
                // avoids the case when the oldPrevious
                // was the root, so we don't need
                // to update the links or m_first

                // need to check for black nodes because
                // black nodes will go into a recursive call
                // and we don't want to fix the linked list links twice
                else if (oldPrevious != currentNode &&
                         currentNode.color != "black")
                {
                    // update m_first
                    this.m_first = currentNode.next;
                    currentNode.next.previous = null;

                    // preserving the swapped node's links
                    currentNode.next = oldPrevious.next;
                    oldPrevious.next = currentNode;
                    currentNode.previous = oldPrevious;
                }

                // if we swapped using m_last, the recursive call to 
                // remove updated m_last so we have to reverse the 
                // change since the original m_last still exists
                if (flag == true) this.m_last = currentNode;

                return true;
            }
        }
    }
}

// recursive helper function for BST's remove
// retrieves the max value starting at a given node
BST.prototype.maxHelper = function (node)
{
    // otherwise check if there's a right node
    while (node.right != null)
    {
        // traverse right
        node = node.right;
    }

    return node.value;
}

// loops through the BST's linked list,
// searches for the value, and returns a reference
// to the previous node behind the value's node
BST.prototype.findPrevious = function (value)
{
    // start at the front
    var currentNode = this.m_first;

    // loop through the list
    while (currentNode != null)
    {
        // if we find the correct node
        if (currentNode.value == value)
        {
            // return a reference to its previous node
            return currentNode.previous;
        }

        // iterate to the next node
        currentNode = currentNode.next;
    }

    // return null if we can't find the value
    return null;
}

BST.prototype.toString = function (delimiter)
{
    // check if a delimiter was passed in
    if (delimiter === null || delimiter === undefined)
    {
        // set the delimiter to the default ' '
        delimiter = ' ';
    }

    // reset the global result string
    result = "";

    // call the inOrder function
    this.inOrder (this.m_root, delimiter);

    // use to slice function to remove the last
    // character in the result (the extra delimiter character)
    result = result.slice(0, -1);

    return result;
}

// inOrder traversal, helps with BST's toString ()
BST.prototype.inOrder = function (node, delimiter)
{
    if (node != null)
    {
        // traverse to the left
        this.inOrder (node.left, delimiter);

        // append the node's value and delimiter
        // to the global result string
        result += node.value.toString () + delimiter;

        // traverse to the right
        this.inOrder (node.right, delimiter);
    }
}

// ================== challenge point ==================

BST.prototype.forEach = function (callback, useInsertionOrder)
{
    // check if we're using insertion order
    if (useInsertionOrder == true)
    {
        // traverse using the linked list
        var currentNode = this.m_first;

        while (currentNode != null)
        {
            // call the callback function on each node
            callback (currentNode.value, this);

            currentNode = currentNode.next;
        }
    }
    // otherwise we're just doing an in-order traversal
    else
    {
        // traverse in-order
        this.inOrderForEach (this.m_root, callback);
    }
}

// inOrder traversal, helps with the for-each function
BST.prototype.inOrderForEach = function (currentNode, callback)
{
    if (currentNode != null)
    {
        // go left
        this.inOrderForEach (currentNode.left, callback);

        // call the callback function on the node
        callback (currentNode.value, this);

        // go right
        this.inOrderForEach (currentNode.right, callback);
    }
}

// ================== Homework Three Code ==================

// Adds multiple values from an array to the BST. Returns the number of values 
// that were added successfully. 
BST.prototype.addMultiple = function (arrOfValues)
{
    var count = 0;

    for (var i = 0; i < arrOfValues.length; i++)
    {
        if (this.add(arrOfValues[i]) === true) { count++; }
    }

    return count;
}

BST.prototype.clear = function ()
{
    // clear the root
    this.m_root = null;

    // clear the first and last
    this.m_first = this.m_last = null;
}

BST.prototype.countLevels = function ()
{
    if (this.m_root == null) return -1;
    return this.countLevelsHelper (this.m_root);
}

BST.prototype.countLevelsHelper = function (currentNode)
{
    // base case
    if (currentNode == null) return 0;

    // find the height of the left and right subtree
    var leftHeight = this.countLevelsHelper (currentNode.left);
    var rightHeight = this.countLevelsHelper (currentNode.right);

    // return the greater value of the left and right subtree
    // add one for each level traversed
    return Math.max (leftHeight, rightHeight) + 1;
}

// returns a reference to a node if it exists
BST.prototype.getNode = function (value)
{
    // check if the root is null
    if (this.m_root == null)
    {
        return false;
    }

    // start at the root
    var currentNode = this.m_root;

    while (true)
    {
        // going left
        if (currentNode.value > value)
        {
            // if we found an empty spot to the left
            if (currentNode.left == null)
            {
                // the value is not here
                return null;
            }

            // otherwise traverse to the left
            currentNode = currentNode.left;
        }
        // going right
        else if (currentNode.value < value)
        {
            // if we found an empty spot to the right
            if (currentNode.right == null)
            {
                // the value is not here
                return null;
            }

            // otherwise traverse to the right
            currentNode = currentNode.right;
        }
        // otherwise we found the value
        else
        {
            return currentNode;
        }
    }
}
// Student name: Alexander Lao
// Student ID: 11481444

// Do not modify this constructor function. Even if you are going for that 3rd
// "challenge point", you will only need to modify "add" and "remove".
function SortedLL489(optionalCompare)
{
    this.m_root = null;
    if (optionalCompare === undefined || optionalCompare == null)
    {
        this.m_compare = function(a,b)
        {
            if (a > b) { return 1; }
            return (a == b) ? 0 : -1;
        };
    }
    else
    {
        this.m_compare = optionalCompare;
    }
    Object.seal(this);
}

SortedLL489.prototype.add = function(valueToAdd)
{
    // TODO: Your code here (2 cases: this.m_root is null or non-null)

    // check if the list is empty
    if (this.m_root == null)
    {
        // make the root the new node
        this.m_root = { value: valueToAdd, next: null, previous: null };
        return true;
    }

    // otherwise the list is not empty
    // start at the root node and keep a reference of the previous node
    var currentNode = this.m_root;
    var previousNode = null;

    // loop to the correct spot
    // for m_compare, a return value of -1 means the first parameter is less than the second parameter
    // 1 means the first parameter is greater than the second parameter
    while ((currentNode != null) && (this.m_compare(currentNode.value, valueToAdd) == -1))
    {
        // iterate to the next node while keeping track of
        // where we are in the list
        previousNode = currentNode;
        currentNode = currentNode.next;
    }

    // after the while loop ends, we should be at the correct spot
    // check that we're not at the front of the list
    if (previousNode != null)
    {
        // insert the new node behind the currentNode and after currentNode's previous
        var newNode = { value: valueToAdd, next: currentNode, previous: previousNode };
        previousNode.next = newNode;

        // protect against adding to the end of the list
        // where the currentNode would be null
        if (currentNode != null)
        {
            currentNode.previous = newNode;
        }
    }
    // otherwise we're inserting at the front of a non-empty list
    else
    {
        // assign the new root with it's next being the old root
        this.m_root = { value: valueToAdd, next: currentNode, previous: null };

        // assign the currentNode's previous as the new root
        currentNode.previous = this.m_root;
        return true;
    }
}

// Implement this function so that it removes the specified value from the list
// If the value is not in the list, then the list is not modified
SortedLL489.prototype.remove = function(valueToRemove)
{
    // TODO: Your code here

    // check if the list is empty
    if (this.m_root == null)
    {
        return false;
    }
    
    // otherwise the list is not empty
    // start at the root node
    var currentNode = this.m_root;

    // loop through the list
    while (currentNode != null)
    {
        // check for the valueToRemove
        if (currentNode.value == valueToRemove)
        {
            // removing from the beginning of the list
            if (currentNode.previous == null)
            {
                // assign the new head
                this.m_root = currentNode.next;

                // check if the root exists before
                // trying to access one of its members
                if (this.m_root != null)
                {
                    this.m_root.previous = null;
                }
                
                return true;
            }
            // removing from the end of the list
            else if (currentNode.next == null)
            {
                // fix the previousNode's next
                currentNode.previous.next = null;

                return true;
            }
            // otherwise the node we want to remove is in the middle
            else
            {
                // assign the currentNode's previous's next to the currentNode's next
                currentNode.previous.next = currentNode.next;

                // assign the currentNode's next's previous to the currentNode's previous
                currentNode.next.previous = currentNode.previous;

                return true;
            }
        }

        // iterate to the next node
        currentNode = currentNode.next;
    }
}

// This function is implemented for you
// You must not alter it in any way
SortedLL489.prototype.toString = function()
{
    var node = this.m_root;
    var str = "";
    while (node !== undefined && node !== null)
    {
        // Append to string
        str += node.value.toString();
        
        // Check the 'next' member
        if (node.next === undefined)
        {
            str += "(node missing 'next' member)";
            return str;
        }
        else if (node.next !== null)
        {
            str += ",";
        }
        
        // Advance to the next node
        node = node.next;
    }
    return str;
}
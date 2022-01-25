

//This is now deprecated... const MerkleTree = require('merkletreejs'); Use below instead.
const {MerkleTree} = require('merkletreejs');

//This is the crypto module we installe with npm install crypto
const crypto = require('crypto');

let leaves;
let tree;
let layers;
let root;
let proof;
let verified;

//Function used for hashing leaves and nodes
function sha256(data) {
    // crypto. is the module we are calling.
    //The crypto.createHash() method is used to create Hash instances.
    //That can be used to generate hash digests using the given algorithm, 'sha256'
    //Update method: Updates the hash content with the given data
    //Calculates the digest of all of the data passed to be hashed (using the hash.update() method)
    return crypto.createHash('sha256').update(data).digest()
}

//Creates an array of hashed leaves
//'a', 'b', 'c', are each of the values being hashed and put into an array
function createLeaves() {
    leaves = ['a', 'b', 'c'].map(x => sha256(x))//mapping through the array and creating hashes
    console.log("Leaves");
    console.log("leaves");
}

//Constructs a new Merkle Tree with the hashed leaves and the hashing function
//With tree = new MerkleTree(leaves, sha256) we are passing it leaves and the sha256 algorithm
function createTree() {
    tree = new MerkleTree(leaves, sha256);
    console.log("Tree");
    console.log(tree);
}

// This outputs all the leaves we just created
function getLeaves() {
    leaves = tree.getLeaves();
    console.log("Leaves");
    console.log("leaves");
}

// Returns array of all layers of Merkle Tree, including leaves and root
function getLayers() {
    layers = tree.getLayers();
    console.log("Layers");
    console.log("layers");
}

// Returns the merkle root hash
function getRoot() {
    root = tree.getRoot();
    console.log("Root");
    console.log(root);
}

//Returns the proof for the target leaf
//Once you create a merkle root you can always trace back to an individual node and compare values
//So here we are passing leaves[2] which is the 2nd element in the array
// Guessing 'a' = 0, 'b' = 1, 'c' = 2, though not sure. Need clarification here.
function getProof() {
    proof = tree.getProof(leaves[2]);
    console.log("Proof");
    console.log(proof);
}

//Returns true if the proof path (array of hashes) can connect the target node to the Merkle root
//proof: The proof that should connect the target node, which is leaves[2] to Merkle root.
//Then we are comparing this proof back to the hashed target node
function verifyNode() {
    verified = tree.verify(proof, leaves[2], root);
    console.log("Verified to be");
    console.log(verified);
}

//Some of theese bottom functions are just for demonstration purposes but the real ones we are
//interested in are createLeaves(); getRoot(); getProof(): and verifyNode();
//Although we are particularly intersted it the ones above, we can also get our trees and layers, etc.
createLeaves();
createTree();
getLeaves();
getLayers();
getRoot();
getProof();
verifyNode();

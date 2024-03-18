const { expect } = require("chai")
const { deployContract } = require("./testUtils")
const admin = require("firebase-admin")

describe("Deployment", function () {
  beforeEach(async () => {
    ;({ contract, owner, contractRef } = await deployContract())
  })

  it("Should set the correct owner", async () => {
    expect(await contract.owner()).to.equal(owner.address)
  })
  it("Should write the new contract address to firebase", async () => {
    await contractRef.doc(contract.address).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      address: contract.address,
    })
    contractRef
      .doc(contract.address)
      .get()
      .then((doc) => {
        expect(doc.data().address).to.equal(contract.address)
        expect(doc.data().address).to.not.equal(undefined)
        expect(doc.data().address).to.not.equal(null)
        expect(doc.data().address).to.not.equal("")
      })
  })

  it("Should start contract with a balance of 0", async () => {
    expect(await contract.viewChessWagerBalance()).to.equal(0)
  })

  it("Should start contract in an unpaused state", async () => {
    expect(await contract.paused()).to.equal(false)
  })
})

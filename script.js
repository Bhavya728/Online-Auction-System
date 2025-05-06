async function registerUser() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const passwordHash = document.getElementById('passwordHash').value;
  const address = document.getElementById('address').value;

  const body = { fullName, email, passwordHash, address };

  try {
    const res = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const msg = await res.text();
    alert(msg);
  } catch (err) {
    alert('Client-side error');
    console.error(err);
  }
}

async function addPhoneNumber() {
  const email = document.getElementById('email2').value;
  const phoneNumber = document.getElementById('phoneNumber2').value;

  try {
    // Step 1: Get userId?
    const res1 = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!res1.ok) {
      const errText = await res1.text();
      alert(`Error fetching userId: ${errText}`);
      return;
    }

    const { userId } = await res1.json();

    // Step 2: Add phone number
    const res2 = await fetch('http://localhost:3000/userphones/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, phoneNumber })
    });

    const msg = await res2.text();
    if (!res2.ok) {
      alert(`Error adding phone: ${msg}`);
    } else {
      alert(msg);
    }
  } catch (err) {
    alert('Client-side error while adding phone number');
    console.error(err);
  }
}

async function createWallet() {
  const email = document.getElementById('walletEmail').value;
  const balance = document.getElementById('walletBalance').value;
  const currency = document.getElementById('walletCurrency').value;

  try {
    // Step 1: Get userId by email
    const res1 = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!res1.ok) {
      const errText = await res1.text();
      alert(`Error fetching userId: ${errText}`);
      return;
    }

    const { userId } = await res1.json();

    // Step 2: Create wallet
    const res2 = await fetch('http://localhost:3000/wallets/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, balance, currency })
    });

    const msg = await res2.text();
    if (!res2.ok) {
      alert(`Error creating wallet: ${msg}`);
    } else {
      alert(msg);
    }
  } catch (err) {
    alert('Client-side error while creating wallet');
    console.error(err);
  }
}
  

async function addWalletTransaction() {
  const walletId = parseInt(document.getElementById('walletId4').value);
  const amount = parseFloat(document.getElementById('amount4').value);
  const type = document.getElementById('transactionType4').value;

  try {
    // Step 1: Validate if walletId is provided
    if (!walletId || isNaN(walletId)) {
      document.getElementById('walletTransactionMessage4').innerText = 'Please enter a valid wallet ID';
      return;
    }

    // Step 2: Add wallet transaction
    const transactionRes = await fetch('http://localhost:3000/wallettransactions/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        walletId,
        amount,
        type
      })
    });

    if (!transactionRes.ok) {
      const msg = await transactionRes.text();
      document.getElementById('walletTransactionMessage4').innerText = `Error: ${msg}`;
      return;
    }

    const responseMessage = await transactionRes.text();
    document.getElementById('walletTransactionMessage4').innerText = responseMessage;

  } catch (err) {
    document.getElementById('walletTransactionMessage4').innerText = 'Error occurred while adding transaction';
    console.error(err);
  }
}


async function makePayment() {
  const email = document.getElementById('paymentEmail').value;
  const amount = document.getElementById('paymentAmount').value;
  const transactionReference = document.getElementById('transactionRef').value;
  const refundEligible = document.getElementById('refundEligible').value;

  if (!refundEligible) {
    alert('Please select refund eligibility');
    return;
  }

  try {
    // Step 1: Get userId by email
    const res1 = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!res1.ok) {
      const errText = await res1.text();
      alert(`Error fetching userId: ${errText}`);
      return;
    }

    const { userId } = await res1.json();

    // Step 2: Make payment
    const res2 = await fetch('http://localhost:3000/payments/make', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount, transactionReference, refundEligible })
    });

    const msg = await res2.text();
    if (!res2.ok) {
      alert(`Error making payment: ${msg}`);
    } else {
      alert(msg);
    }
  } catch (err) {
    alert('Client-side error while making payment');
    console.error(err);
  }
}

async function sendNotification() {
  const email = document.getElementById('email6').value;
  const message = document.getElementById('message6').value;
  const isRead = parseInt(document.getElementById('isRead6').value);

  try {
    // Step 1: Get userId by email
    const userRes = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!userRes.ok) {
      const errText = await userRes.text();
      document.getElementById('notificationMessage6').innerText = `Error fetching userId: ${errText}`;
      return;
    }

    const { userId } = await userRes.json();

    // Step 2: Send notification
    const notificationRes = await fetch('http://localhost:3000/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        message,
        isRead
      })
    });

    if (!notificationRes.ok) {
      const msg = await notificationRes.text();
      document.getElementById('notificationMessage6').innerText = `Error: ${msg}`;
      return;
    }

    const responseMessage = await notificationRes.text();
    document.getElementById('notificationMessage6').innerText = responseMessage;
  } catch (err) {
    document.getElementById('notificationMessage6').innerText = 'Error occurred while sending notification';
    console.error(err);
  }
}


async function createCategory() {
  const parentCategoryId = document.getElementById('parentCategoryId7').value || null;
  const name = document.getElementById('name7').value;
  const description = document.getElementById('description7').value;
  const isActive = document.getElementById('isActive7').value;

  const body = {
    parentCategoryId: parentCategoryId ? Number(parentCategoryId) : null,
    name,
    description,
    isActive: Number(isActive)
  };

  try {
    const res = await fetch('http://localhost:3000/categories/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const msg = await res.text();
    alert(msg);
  } catch (err) {
    alert('Client-side error while creating category');
    console.error(err);
  }
}


async function createItem() {
  const name = document.getElementById('itemName').value;
  const description = document.getElementById('itemDescription').value;
  const categoryName = document.getElementById('categoryName').value;
  const sellerEmail = document.getElementById('sellerEmail').value;
  const basePrice = parseFloat(document.getElementById('basePrice').value);
  const reservePrice = parseFloat(document.getElementById('reservePrice').value);

  try {
    // Step 1: Get sellerId from email
    const userRes = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(sellerEmail)}`);
    if (!userRes.ok) {
      const errText = await userRes.text();
      alert(`Error fetching userId: ${errText}`);
      console.error(`Error fetching userId: ${errText}`);
      return;
    }
    const { userId: sellerId } = await userRes.json();
    console.log(userRes);

    // Step 2: Get categoryId from category name
    const categoryRes = await fetch('http://localhost:3000/categories/all');
if (!categoryRes.ok) {
  throw new Error('Error fetching categories');
}

const categories = await categoryRes.json();
const category = categories.find(cat => cat.name === categoryName);
console.log(category);
if (!category) {
  throw new Error('Category not found');
}

const categoryId = category.id;

    // Step 3: Create Item
    const body = { name, description, categoryId, sellerId, basePrice, reservePrice };

    const res = await fetch('http://localhost:3000/items/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const msg = await res.text();
    if (!res.ok) {
      alert(`Error: ${msg}`);
      console.error(`Error: ${msg}`);
    } else {
      alert(msg);
    }
  } catch (err) {
    alert('Client-side error while creating item');
    console.error('Client-side error while creating item:', err);
  }
}
async function addItemImage() {
  const itemName = document.getElementById('itemName9').value;
  const imageUrl = document.getElementById('imageUrl9').value;

  try {
    // Step 1: Get item ID by name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      document.getElementById('imageMessage9').innerText = `Error: ${msg}`;
      return;
    }

    const { id: itemId } = await itemRes.json();

    // Step 2: Post the image
    const res = await fetch('http://localhost:3000/itemimages/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, imageUrl })
    });

    const msg = await res.text();
    document.getElementById('imageMessage9').innerText = msg;

  } catch (error) {
    console.error(error);
    document.getElementById('imageMessage9').innerText = 'Client-side error while adding image';
  }
}

async function addItemSpecification() {
  const itemName = document.getElementById('itemName10').value;
  const specKey = document.getElementById('specKey10').value;
  const specValue = document.getElementById('specValue10').value;
  const messageDiv = document.getElementById('specMessage10');

  messageDiv.innerHTML = 'Adding...';

  try {
    // Step 1: Get itemId by item name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) throw new Error('Item not found');
    const item = await itemRes.json();
    const itemId = item.id;

    // Step 2: Add specification using itemId
    const specRes = await fetch('http://localhost:3000/itemspecs/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, specKey, specValue })
    });

    if (!specRes.ok) throw new Error('Failed to add specification');

    messageDiv.innerHTML = '<span style="color:green;">Specification added successfully.</span>';
  } catch (err) {
    console.error(err);
    messageDiv.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
  }
}
async function addAuctionMeta() {
  const itemName = document.getElementById('itemName11').value;
  const startTimestamp = document.getElementById('startTimestamp11').value.replace('T', ' ');
  const endTimestamp = document.getElementById('endTimestamp11').value.replace('T', ' ');
  const startPrice = parseFloat(document.getElementById('startPrice11').value);
  const auctionType = document.getElementById('auctionType11').value;

  try {
    // Step 1: Get item ID by name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      document.getElementById('auctionMetaMessage11').innerText = `Error: ${msg}`;
      return;
    }

    const { id: itemId } = await itemRes.json();

    // Step 2: Add Auction Meta
    const auctionMetaRes = await fetch('http://localhost:3000/auctionmeta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId,
        startTimestamp,
        endTimestamp,
        startPrice,
        auctionType
      })
    });

    if (!auctionMetaRes.ok) {
      const msg = await auctionMetaRes.text();
      document.getElementById('auctionMetaMessage11').innerText = `Error: ${msg}`;
      return;
    }

    const responseMessage = await auctionMetaRes.text();
    document.getElementById('auctionMetaMessage11').innerText = responseMessage;
    
  } catch (err) {
    document.getElementById('auctionMetaMessage11').innerText = 'Error occurred while adding auction meta';
    console.error(err);
  }
}

async function addAuctionSession() {
  const itemName = document.getElementById('itemName12').value;
  const bidCount = parseInt(document.getElementById('bidCount12').value, 10);

  try {
    // Step 1: Get item ID by name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      document.getElementById('auctionSessionMessage12').innerText = `Error: ${msg}`;
      return;
    }

    const { id: itemId } = await itemRes.json();

    // Step 2: Add Auction Session
    const auctionSessionRes = await fetch('http://localhost:3000/auctionsessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId,
        bidCount
      })
    });

    if (!auctionSessionRes.ok) {
      const msg = await auctionSessionRes.text();
      document.getElementById('auctionSessionMessage12').innerText = `Error: ${msg}`;
      return;
    }

    const responseMessage = await auctionSessionRes.text();
    document.getElementById('auctionSessionMessage12').innerText = responseMessage;
    
  } catch (err) {
    document.getElementById('auctionSessionMessage12').innerText = 'Error occurred while creating auction session';
    console.error(err);
  }
}





async function linkItemToAuction() {
  const itemName = document.getElementById('itemName13').value.trim();
  const auctionTitle = document.getElementById('auctionTitle13').value.trim();
  const messageEl = document.getElementById('itemAuctionMessage13');

  try {
    // Step 1: Get itemId by name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }

    const { id: itemId } = await itemRes.json();

    // Step 2: Get auctionId by title
    const auctionRes = await fetch(`http://localhost:3000/auctionsessions/fetchId?itemId=${encodeURIComponent(itemId)}`);
    if (!auctionRes.ok) {
      const msg = await auctionRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { auctionId } = await auctionRes.json();
    console.log(auctionId);
    // Step 3: Link the item and auction
    const linkRes = await fetch('http://localhost:3000/itemauctions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, auctionId })
    });

    const msg = await linkRes.text();
    messageEl.innerText = msg;

  } catch (err) {
    console.error(err);
    messageEl.innerText = 'Client-side error while linking item to auction';
  }
}

async function addReview() {
  const email = document.getElementById('email17').value;
  const itemName = document.getElementById('itemName17').value;
  const rating = parseInt(document.getElementById('rating17').value);

  try {
    // Step 1: Get userId by email
    const userRes = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!userRes.ok) {
      const errText = await userRes.text();
      document.getElementById('reviewMessage17').innerText = `Error fetching userId: ${errText}`;
      return;
    }

    const { userId } = await userRes.json();

    // Step 2: Get itemId by item name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const errText = await itemRes.text();
      document.getElementById('reviewMessage17').innerText = `Error fetching itemId: ${errText}`;
      return;
    }

    const { id: itemId } = await itemRes.json();

    // Step 3: Add review
    const reviewRes = await fetch('http://localhost:3000/reviews/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        itemId,
        rating
      })
    });

    if (!reviewRes.ok) {
      const msg = await reviewRes.text();
      document.getElementById('reviewMessage17').innerText = `Error: ${msg}`;
      return;
    }

    const responseMessage = await reviewRes.text();
    document.getElementById('reviewMessage17').innerText = responseMessage;
  } catch (err) {
    document.getElementById('reviewMessage17').innerText = 'Error occurred while adding review';
    console.error(err);
  }
}
async function placeBid() {
  const email = document.getElementById('email14').value.trim();
  const itemName = document.getElementById('itemName14').value.trim();
  const amount = parseFloat(document.getElementById('bidAmount14').value);
  const messageEl = document.getElementById('bidMessage14');

  try {
    // Step 1: Get userId from email
    const userRes = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!userRes.ok) {
      const msg = await userRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { userId } = await userRes.json();
    console.log(userRes); // Logging the response object for debugging

    // Step 2: Get itemId from item name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { id: itemId } = await itemRes.json();

    // Step 3: Get auctionId from itemId
    const auctionRes = await fetch(`http://localhost:3000/auctionsessions/fetchId?itemId=${encodeURIComponent(itemId)}`);
    if (!auctionRes.ok) {
      const msg = await auctionRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { auctionId } = await auctionRes.json();

    // Step 4: Place the bid
    const bidRes = await fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, auctionId, amount })
    });

    const msg = await bidRes.text();
    messageEl.innerText = msg;
  } catch (err) {
    console.error(err);
    messageEl.innerText = 'Client-side error while placing bid';
  }
}

// Add this to your script.js
async function addTransaction() {
  const email = document.getElementById('email15').value.trim();
  const itemName = document.getElementById('itemName15').value.trim();
  const amount = parseFloat(document.getElementById('amount15').value);
  const fee = parseFloat(document.getElementById('fee15').value);
  const currency = document.getElementById('currency15').value.trim().toUpperCase();
  const messageEl = document.getElementById('transactionMessage15');

  try {
    // Get buyerId from email
    const userRes = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!userRes.ok) {
      const msg = await userRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { userId: buyerId } = await userRes.json();

    // Get itemId from item name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { id: itemId } = await itemRes.json();

    // Get auctionId from itemId
    const auctionRes = await fetch(`http://localhost:3000/auctionsessions/fetchId?itemId=${encodeURIComponent(itemId)}`);
    if (!auctionRes.ok) {
      const msg = await auctionRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { auctionId } = await auctionRes.json();

    // Create transaction
    const transactionRes = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buyerId,
        auctionId,
        amount,
        transactionFee: fee,
        currency: currency || 'USD' // Default to USD if empty
      })
    });

    const msg = await transactionRes.text();
    messageEl.innerText = transactionRes.ok ? `Success: ${msg}` : `Error: ${msg}`;
  } catch (err) {
    console.error(err);
    messageEl.innerText = 'Client-side error recording transaction';
  }
}

// Add this to script.js
async function addShipping() {
  const email = document.getElementById('email16').value.trim();
  const itemName = document.getElementById('itemName16').value.trim();
  const address = document.getElementById('address16').value.trim();
  const trackingNumber = document.getElementById('tracking16').value.trim();
  const deliveryTimestamp = document.getElementById('deliveryTime16').value;
  const cost = parseFloat(document.getElementById('cost16').value);
  const carrier = document.getElementById('carrier16').value.trim();
  const insurance = parseInt(document.getElementById('insurance16').value);
  const messageEl = document.getElementById('shippingMessage16');

  try {
    // Get buyerId from email
    const userRes = await fetch(`http://localhost:3000/users/getUserId?email=${encodeURIComponent(email)}`);
    if (!userRes.ok) {
      const msg = await userRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { userId: buyerId } = await userRes.json();

    // Get itemId from item name
    const itemRes = await fetch(`http://localhost:3000/items/name/${encodeURIComponent(itemName)}`);
    if (!itemRes.ok) {
      const msg = await itemRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { id: itemId } = await itemRes.json();

    // Get auctionId from itemId
    const auctionRes = await fetch(`http://localhost:3000/auctionsessions/fetchId?itemId=${encodeURIComponent(itemId)}`);
    if (!auctionRes.ok) {
      const msg = await auctionRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { auctionId } = await auctionRes.json();

    // Get transactionId from buyerId and auctionId
    const transactionRes = await fetch(`http://localhost:3000/transactions/by-buyer-auction?buyerId=${buyerId}&auctionId=${auctionId}`);
    if (!transactionRes.ok) {
      const msg = await transactionRes.text();
      messageEl.innerText = `Error: ${msg}`;
      return;
    }
    const { id: transactionId } = await transactionRes.json();

    // Create shipping record
    const shippingRes = await fetch('http://localhost:3000/shipping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactionId,
        address,
        trackingNumber,
        deliveryTimestamp: deliveryTimestamp ? new Date(deliveryTimestamp).toISOString() : null,
        cost,
        carrier,
        insurance
      })
    });

    const msg = await shippingRes.text();
    messageEl.innerText = shippingRes.ok ? `Success: ${msg}` : `Error: ${msg}`;
  } catch (err) {
    console.error(err);
    messageEl.innerText = 'Client-side error adding shipping info';
  }
}

function callRoute(routeName) {
  alert(`Calling ${routeName}`);
}

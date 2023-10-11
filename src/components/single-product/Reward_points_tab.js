import Link from 'next/link';
const Reward_points_tab = () => {
return(<>
              <div className="container p-0">
        <div className="row">
            <h3 className="top-title"> Pool Table Offers Reward Points System</h3>
            <p> Pool Table Offers a reward points system that allows you to save even more on your shopping. Find out how it works and what it entails!</p>
            <h4>How does it work?</h4>
            <p> Pool Table Offers reward system is based on how frequently you shop with us. Whenever you shop at our store, you receive reward points. Below you will find information on how our reward system works!</p>
            <h4>Reward Points Terms &amp; Conditions</h4>
            <ul className="liarrow">
                <li>For every dollar you spend, you get 1 reward point!</li>
                <li>Your reward points can be redeemed once you have 100 points in total</li>
                <li>For every 100 points, you can redeem $1 to spend with us</li>
                <li>We do have periodic offers where you can get additional reward points too. Sign up for the newsletter to get regular deals notifications</li>
                <li>Rewards point dollars can’t be exchanged for cash or can’t be withdrawn to your bank account. Even not transferable to other accounts too. It must be used on our online store only.</li>
            </ul>
            <p>Subscribe today and start getting rewards points &amp; also to get regular updates on the deal, so you won’t miss out on those!!</p>
            <h4>How to view and redeem earned reward points</h4>
            <ul className="liarrow">
                <li>Create an account with us first &amp; Log into your  Pool Table Offers account.</li>
                <li>Go to the <Link href="/my-account/">My Account</Link> section.</li>
                <li>View your reward point details like the order number, earned points and used points.</li>
                <li>To redeem points, add an item you want to buy to the cart, proceed to checkout, and write the number of points (Dollars) you want to redeem in a particular order.</li>
            </ul>
            <p>That’s it. Your earned rewards Dollars will be applied based on the redeem points system.</p>
            <h4 className="note-color">Note: </h4>
            <p>Even if you haven't created an account on our site, you are still eligible to receive reward points. Every time you make a purchase, you will be sent your reward points in the form of an email. However, we recommend creating an account so you can see a detailed overview of your rewards and use them.</p>
            <h3 className="top-title">FAQs</h3>
            <h4>What is the validity of earned reward points?</h4>
            <p>Redeeming earned rewards points does not have a deadline at the moment. They can be redeemed at any time in the future. If there a termination or suspension of rewards point, we will let you know in advance</p>
            <h4>Will my reward points be returned if I cancel or refund my order?</h4>
            <p>In case you return or cancel and refund applied to your order for any reason, your reward points will be deducted accordingly from your  Pool Table Offers account.</p>
        </div>
    </div>
                
</>);
}
export default Reward_points_tab;
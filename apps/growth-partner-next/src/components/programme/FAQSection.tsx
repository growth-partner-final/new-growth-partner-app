import { Accordion, type AccordionItem } from '../ui/Accordion';
import { Badge } from '../ui/Badge';

const FAQ_ITEMS: AccordionItem[] = [
  {
    title: 'Nexora Growth Partner banne ke liye koi investment ya fee deni hoti hai?',
    content: (
      <p style={{ margin: 0 }}>
        Nahi, bilkul zero investment! Nexora Growth Partner registration 100% free hai. Kisi bhi tarah ki registration fee, security deposit, franchise cost ya equipment charge nahi liya jata. Koi bhi vyakti verified local salons ko onboard karke earn karna shuru kar sakta hai.
      </p>
    ),
  },
  {
    title: 'Shop qualify kaise hoti hai? 15-day streak kya hai?',
    content: (
      <p style={{ margin: 0 }}>
        Ek referred shop tab qualify hoti hai jab wo lagatar (consecutive) 15 business days tak daily kam se kam ₹1,000 ka genuine customer QR payment collect kare. Total 15 din ka minimum collection ₹15,000 hona chahiye, jis par 10% company commission (minimum ₹1,500) generate hota hai. Sath hi KYC, QR activation aur fraud verification clear hona anivarya hai.
      </p>
    ),
  },
  {
    title: 'Agar kisi din ₹1,000 se kam collection ho to streak ka kya hoga?',
    content: (
      <p style={{ margin: 0 }}>
        Yeh 15 din strictly consecutive (lagatar) hone chahiye. Agar salon kisi din ₹999 collect karta hai ya us din koi reversal/artificial transaction hota hai, to wo din qualify nahi hota aur 15-day streak reset ho jati hai. Shop ko dobara lagatar 15 qualifying days pure karne honge.
      </p>
    ),
  },
  {
    title: 'One-time onboarding reward kitna milta hai aur kaise calculate hota hai?',
    content: (
      <div>
        <p style={{ margin: '0 0 8px' }}>
          One-time onboarding reward company commission ka 10% hota hai jo shop ke pehle qualifying 15 din me collect hota hai:
        </p>
        <ul style={{ margin: '0 0 8px', paddingLeft: '20px' }}>
          <li>₹15,000 collection → ₹1,500 company commission (10%) → <strong>₹150 partner reward</strong></li>
          <li>₹50,000 collection → ₹5,000 company commission (10%) → <strong>₹500 partner reward</strong></li>
        </ul>
        <p style={{ margin: 0 }}>
          Is reward par koi maximum cap ya limit nahi hai. Yeh ek bar milta hai jab salon pehli bar 15-day streak qualify karta hai.
        </p>
      </div>
    ),
  },
  {
    title: 'Kya partner reward poore QR collection ka 10% hota hai?',
    content: (
      <p style={{ margin: 0 }}>
        Nahi! Partner reward company ke 10% commission par 10% compute hota hai (jo ki total QR volume ka 1% banta hai). Example: ₹15,000 QR collection par company commission ₹1,500 banti hai, to partner ka reward ₹150 hota hai. Isko kabhi bhi total QR collection ka direct 10% (yani ₹1,500) nahi dikhaya jata.
      </p>
    ),
  },
  {
    title: 'Recurring growth share ka kya schedule hai?',
    content: (
      <div>
        <p style={{ margin: '0 0 8px' }}>
          Recurring growth share active qualifying shops ke eligible company commission par monthly milta hai:
        </p>
        <ul style={{ margin: '0 0 8px', paddingLeft: '20px' }}>
          <li><strong>Months 1 – 6:</strong> 10% of eligible company commission</li>
          <li><strong>Months 7 – 12:</strong> 5% of eligible company commission</li>
          <li><strong>After 12 Months:</strong> 2% lifetime growth share</li>
        </ul>
        <p style={{ margin: 0 }}>
          Yeh recurring commission one-time reward se alag ledger row me record hota hai.
        </p>
      </div>
    ),
  },
  {
    title: '7 Reward milestones kaun se hain aur kya unhe cash me badla ja sakta hai?',
    content: (
      <div>
        <p style={{ margin: '0 0 8px' }}>
          Official Nexora milestone rewards ki binding list yeh hai:
        </p>
        <ol style={{ margin: '0 0 8px', paddingLeft: '20px' }}>
          <li>25 Shops — Official Nexora T-Shirt</li>
          <li>50 Shops — Samsung Tablet</li>
          <li>100 Shops — Branded HP Laptop</li>
          <li>250 Shops — Electric Scooter</li>
          <li>500 Shops — Latest iPhone</li>
          <li>750 Shops — Royal Enfield 350 CC</li>
          <li>1000+ Shops — District Partner SUV Car</li>
        </ol>
        <p style={{ margin: 0, fontWeight: 600 }}>
          Rewards verified qualifying shops, fraud clearance aur written approval ke subject hain. Cash alternative available nahi hai.
        </p>
      </div>
    ),
  },
  {
    title: 'Plus-one claim unlock ka kya matlab hai?',
    content: (
      <p style={{ margin: 0 }}>
        Jab aap 25 qualifying shops onboard karke Tier 1 (Official Nexora T-Shirt) claim karte hain, to aapka shop count 0 par reset nahi hota! Tier 2 (Samsung Tablet @ 50 shops) unlock karne ke liye aapko sirf 25 additional shops ki zaroorat hoti hai. Cumulative progress lagatar aage badhti rehti hai.
      </p>
    ),
  },
  {
    title: 'Kaun si transactions fraud ya excluded maani jaati hain?',
    content: (
      <p style={{ margin: 0 }}>
        Refunds, chargebacks/reversals, partner ya salon owner ka khud ke card/UPI se kiya gaya self-payment, circular loops (doston/parivar ke beech paise ghumana), non-operational fake shops, aur artificial split payments strictly excluded hain. Aise transactions paye jaane par streak break ho jati hai aur account review me ja sakta hai.
      </p>
    ),
  },
];

export function FAQSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <Badge variant="magenta">Frequently Asked Questions</Badge>
          <h2 className="heading-section">Aksar Poochhe Jaane Wale Sawal</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Everything you need to know about salon qualification, commission math, streaks, and milestone fulfillment.
          </p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}

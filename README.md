<h1><a href="signature.ceo"><img src=".github/banner.png" alt="signature.ceo / signed.rsvp"></a></h1>

> **Note**
>
> This project was built during [ETHGlobal Lisbon](https://wagmi.sh/),<br />
> a time-limited hackathon, and therefore project state is not feature complete.

### 🤷 So why two projects?

Its a long story. TLDR; Signatures are cool 😎. And we don't have enough time to write a competent readme as the end of the hackathon is near 🙈

<h2><a href="https://signature.ceo" target="_blank">✍️ signature.ceo</a></h2>

As described above, signatures are cool. SignatureCEO aims to be a tool to help facilitate signage proofs for everyday things. Think promises to friends, resolutions, goals, but also media-release forms, contracts, and terms of services. Integrating [signature.ceo](signature.ceo) is super easy and can be done natively in any site. Allowing for the user to sign a message on the site itself, and [signature.ceo](signature.ceo) to provide for the proof of the signature with a beautiful receipt page.

### ❓ How to use

Simply visit [signature.ceo](signature.ceo) (or hit the POST endpoint on `/s` with a signature and payload) and either submit a signature request or a signature itself. You are then presented with a screen for signing, or a sharable link that allows for easy signature collection.

### 🥅 Goals

Hackathons only have a finite amount of time, however if granted more time we would love to work on building react-hooks to allow for easily signing messages on third-party sites and embedding receipts.

<h2><a href="https://signed.rsvp" target="_blank">🎟️ signed.rsvp</a></h2>

Another cool use of signatures is RSVP-ing to an event. [signed.rsvp](signed.rsvp) is a tool to help facilitate RSVPs for events. It allows for the event organizer to create an event, and then share the link with their guests. Guests can then RSVP to the event by signing a message with their wallet. The event organizer can then verify the signatures of the guests to see who has RSVP'd to the event. In addition to the above [worldcoin](worldcoin.org) Proof of Personhood can be opted-in to by the event organizer to allow for a more sybil-resistant RSVP list.

### ❓ How to use

If you would like to test out our test-event checkout [this demo event page](https://signed.rsvp/e/123456789). On this page you can RSVP to a hypothetical rAAVE in Lisbon event. This event has worldcoin verification enabled, meaning you can test it out if you are either `phone` or `orb` verified. In addition to the above your signature will be shown.

### 🥅 Goals

Again, hackathons only have a finite amount of time, however if granted more time we would love to work on building an organizer dashboard, where only organizers can see the attendees who have RSVP'd, aswell as an on-chain staking system and easy bitfield stake returning for organizers to be able to return stake to members who attended the event.

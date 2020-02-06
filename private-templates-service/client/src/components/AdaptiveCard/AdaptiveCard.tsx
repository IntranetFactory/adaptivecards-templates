import * as React from "react";
import * as AdaptiveCards from "adaptivecards";
import { Card, Container, TemplateName } from "../AdaptiveCard/styled";


function retrieveCard(): any {
  const url = "http://localhost:5000/template";
  const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiIzOGZhZDdhOS1mZDhjLTQ3Y2MtOWMwYi02YzlmMzE3ODU3NjIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3L3YyLjAiLCJpYXQiOjE1ODEwMzEwMjksIm5iZiI6MTU4MTAzMTAyOSwiZXhwIjoxNTgxMDM0OTI5LCJhaW8iOiI0Mk5nWUFqdThoSXRqTCszUGUvem1mczZYOWU3QUFBPSIsImF6cCI6IjM4ZmFkN2E5LWZkOGMtNDdjYy05YzBiLTZjOWYzMTc4NTc2MiIsImF6cGFjciI6IjEiLCJvaWQiOiJjODgyYjI4Yi1lOTNlLTQ5YmYtOGYyYi03ODAzZTFiY2QwMWIiLCJzdWIiOiJjODgyYjI4Yi1lOTNlLTQ5YmYtOGYyYi03ODAzZTFiY2QwMWIiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJjVHYwNWR2bUtreXBfcmNwbkkwZEFBIiwidmVyIjoiMi4wIn0.UmroEcqUDATn38fUBMhsTJrcol_E0nvtN1FgR8SpEcByPJmGXWiiTP2pULvRp2yAspPDqQdXLVP6V8GlvniL-pyo92aEdUTSL7Z5-ZnwujLFEWW7-J4n8OvM1938ZqfriFZXlx0-_eJXSKM5cBvU6yl4IrzG6rARQrCV2i95RmvdH7Jikn6TvSSoK5QPMjfdNfn99qkQHZRb45UKYM0T59-GQt1hcDT3u1Ljz05FBKPueNlUS0ZI3umHmd9qIGwRYo6so1zWEeW5tOzznXq9yt5Z60Wa4YjR2YARMDrbiCdjL4Bo70B0AVfGiM_avZ8L7JCinuZqTTdxZ9xO_dzabw"
  fetch(url, {
    headers: {
      Authorization: `${token}`
    }
  })
    .then(res => res.text())
    .then(json => console.log(json));
}

function getCard(): any {
  retrieveCard();


  // Hard coded, will remove and connect to backend in future PR
  let card = {
    type: "AdaptiveCard",
    version: "1.0",
    body: [
      {
        type: "Image",
        url: "http://adaptivecards.io/content/adaptive-card-50.png"
      },
      {
        type: "TextBlock",
        text: "Hello **Adaptive Cards!**"
      }
    ],
    actions: [
      {
        type: "Action.OpenUrl",
        title: "Learn more",
        url: "http://adaptivecards.io"
      },
      {
        type: "Action.OpenUrl",
        title: "GitHub",
        url: "http://github.com/Microsoft/AdaptiveCards"
      }
    ]
  };
  return card;
}

function renderingSetup(): AdaptiveCards.AdaptiveCard {
  let adaptiveCard = new AdaptiveCards.AdaptiveCard();
  // Set its hostConfig property unless you want to use the default Host Config
  // Host Config defines the style and behavior of a card
  adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
    fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
  });
  return adaptiveCard
}

function parseCardTemplate(): AdaptiveCards.AdaptiveCard {
  let adaptiveCard = renderingSetup();
  try {
    let cardTemplate = getCard();
    // Parse the card payload
    adaptiveCard.parse(cardTemplate);
    return adaptiveCard;
  }
  catch (e) {
    return new AdaptiveCards.AdaptiveCard;
  }
}

function renderAdaptiveCard(): any {
  let adaptiveCard = parseCardTemplate();
  try {
    // Render the card to an HTML element
    let renderedCard = adaptiveCard.render();
    return renderedCard;
  }
  catch (e) {
    return <div>Error</div>
  }
}

class AdaptiveCard extends React.Component {
  render() {
    return (
      <Container>
        <Card
          ref={n => {
            // Work around for known issue: https://github.com/gatewayapps/react-adaptivecards/issues/10
            n && n.firstChild && n.removeChild(n.firstChild);
            n && n.appendChild(renderAdaptiveCard());
          }}
        />
        <TemplateName>Template Name</TemplateName>
      </Container>
    );
  }
}

export default AdaptiveCard;

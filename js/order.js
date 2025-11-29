document.getElementById("order-form").addEventListener("submit", async function(e){
    e.preventDefault();

    const payload = {
      shop_name: this.shop_name.value,
      shop_mobile: this.shop_mobile.value,
      items: JSON.parse(this.items.value),
      timestamp: Date.now()
    };

    const res = await fetch(
      "https://api.github.com/repos/YOUR_USERNAME/sv-traders-order-system/actions/workflows/save-order.yml/dispatches",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": "Bearer YOUR_PERSONAL_TOKEN"  
        },
        body: JSON.stringify({
          ref: "main",
          inputs: { order: JSON.stringify(payload) }
        })
      }
    );

    document.getElementById("status").innerText = "Order submitted!";
});

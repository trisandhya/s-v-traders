import json
from googletrans import Translator  # pip install googletrans==4.0.0-rc1

def translate_products(input_file, output_file, target_lang):
    translator = Translator()

    # Load English-only products.json
    with open(input_file, "r", encoding="utf-8") as f:
        products = json.load(f)

    # Translate each product name into target language
    for product in products:
        english_name = product["name"]["en"]
        translation = translator.translate(english_name, src="en", dest=target_lang)
        product["name"][target_lang] = translation.text

    # Save new bilingual JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(f"Translated catalog saved to {output_file}")

# Example usage:
# translate_products("products.json", "products_hi.json", "hi")   # Hindi
# translate_products("products.json", "products_te.json", "te")   # Telugu

"use client";

const DeliverySection = () => {
  return (
    <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
        <p className="mb-2 font-semibold">Delivery:</p>
        <div className="inline-flex" role="group" aria-label="Basic radio toggle button group">
            <input 
                type="radio" 
                className="btn-check dark:border-defaultborder/10 " 
                name="btnradio" 
                id="btnradio1" />
            <label 
                className="ti-btn ti-btn-outline-light !text-defaulttextcolor dark:hover:!bg-light 
                    dark: !border-defaultborder/10 dark:text-defaulttextcolor/70 !border-e-0 
                    dark:!border-defaultborder/10 !rounded-e-none !font-medium" 
                    htmlFor="btnradio1">Free Delivery
            </label>
            <input 
                type="radio" 
                className="btn-check active active:bg-light" 
                name="btnradio" 
                id="btnradio2" defaultChecked 
            />
            <label 
                className="ti-btn ti-btn-light dark:!border-defaultborder/10  
                    dark:text-defaulttextcolor/70 dark:hover:!bg-light !font-medium !rounded-s-none" 
                htmlFor="btnradio2">
                Express Delivery
            </label>
        </div>
        <p 
            className="mb-0 mt-2 text-[0.75rem] text-[#8c9097] dark:text-white/50">
                Delivered by 24,Nov 2022
        </p>

    </div>
  )
}

export default DeliverySection
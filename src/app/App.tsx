import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import svgE1 from "../imports/EmptyState1/svg-4pwqqtr0t8";
import svgE1_1 from "../imports/EmptyState1-1/svg-7h6w0w4nn3";
import svgCP from "../imports/CreateProduct/svg-8vda8388u0";
import svgPagos from "../imports/Pagos-1/svg-i9dqhgb5zr";
import svgProds from "../imports/UiSeccionCobroConCatalogo-2/svg-nr9b7t4r4u";
import svgCashReg from "../imports/IconFillIcSale/svg-kot07dyito";
import svgPV from "../imports/ProductVisualizacion/svg-pi74w8qury";
import imgSneaker from "../imports/ProductVisualizacion/f92cde031c4a218992de87f81f773a3859c8498a.png";
import imgCard from "../imports/Pagos-1/5a728c2f6078cde80c55091bf9f2eb0eeb24968a.png";
import imgCard1 from "../imports/Pagos-1/bfb4d0e5d42f0a85a652d9f2b3f840dc2ef1a0a7.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product { id: string; name: string; price: string; hasPhoto?: boolean; }

type AppScreen = "home-payments" | "home-productos" | "tus-productos" | "create-product" | "product-detail" | "cobro";

// ─── Shared atoms ─────────────────────────────────────────────────────────────

// StatusBar is hidden on real devices — the system status bar handles this.
// The component is kept as a stub to avoid changing all call sites.
function StatusBar({ dark: _dark = false }: { dark?: boolean }) {
  return null;
}

function ChevronSvg({ color = "#121E6C" }: { color?: string }) {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 11.6667">
      <path clipRule="evenodd" d={svgE1.p32a7b500} fill={color} fillRule="evenodd" />
    </svg>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <button onClick={onPress} className="relative shrink-0 size-[24px] cursor-pointer">
      <div className="absolute flex inset-[8.33%_25.71%_8.33%_25.68%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
          <div className="relative size-full"><ChevronSvg /></div>
        </div>
      </div>
    </button>
  );
}

function CloseXButton({ onPress }: { onPress: () => void }) {
  return (
    <button onClick={onPress} className="relative shrink-0 size-[24px] cursor-pointer">
      <div className="absolute inset-[15.63%_14.06%_15.62%_17.19%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
          <path clipRule="evenodd" d={svgE1.p25dc38a0} fill="#121E6C" fillRule="evenodd" />
        </svg>
      </div>
    </button>
  );
}

function ShoppingBagIllustration({ size = 96 }: { size?: number }) {
  const inner = size * (40 / 96);
  return (
    <div className="bg-[#f7f8fb] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0"
      style={{ width: size, height: size, padding: size * (24 / 96) }}>
      <div className="overflow-clip relative shrink-0" style={{ width: inner, height: inner }}>
        <div className="absolute inset-[8.17%_4.52%_7.85%_4.69%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.3167 33.5894">
            <path d={svgE1.p6ae8c00} fill="#D0D2DF" />
            <path d={svgE1.p31e6cd80} fill="#9499BB" />
            <path d={svgE1.pf17b780} fill="#9499BB" />
            <path d={svgE1.p1e993b00} fill="#D0D2DF" />
            <path d={svgE1.p17b25100} fill="#9499BB" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ActiveBadge() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[16px]">
        <div className="-translate-y-1/2 absolute aspect-square left-[16.67%] right-[16.67%] top-1/2">
          <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 10.6667 10.6667">
            <circle cx="5.33333" cy="5.33333" fill="#6CDCAB" r="5.33333" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Activo</p>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick?: () => void }) {
  const displayPrice = product.price.startsWith("$") ? product.price : "$" + product.price;
  const Tag = onClick ? "button" : "div";
  return (
    <Tag onClick={onClick} className={`bg-white content-stretch drop-shadow-[0px_8px_10px_rgba(18,30,108,0.08)] flex gap-[12px] items-center p-[12px] relative rounded-[16px] shrink-0 w-[343px] text-left${onClick ? " cursor-pointer" : ""}`}>
      {product.hasPhoto ? (
        <div className="content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[96px]">
          <img alt={product.name} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgSneaker} />
        </div>
      ) : (
        <ShoppingBagIllustration />
      )}
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-full items-start justify-center min-w-px relative">
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start leading-[0] min-h-px relative text-[#1e1e1e] w-full">
            <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] w-[211px]">
              <p className="leading-[16px]">{product.name}</p>
            </div>
            <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">{displayPrice}</p>
            </div>
          </div>
          <ActiveBadge />
        </div>
      </div>
    </Tag>
  );
}

function GhostProductCard({ name, price }: { name: string; price: string }) {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_8px_10px_rgba(18,30,108,0.08)] flex gap-[12px] items-center p-[12px] relative rounded-[16px] shrink-0 w-[343px]">
      <ShoppingBagIllustration />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-full items-start justify-center min-w-px relative">
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start leading-[0] min-h-px relative text-[#1e1e1e] w-full">
            <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] w-[211px]">
              <p className="leading-[16px]">{name}</p>
            </div>
            <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">{price}</p>
            </div>
          </div>
          <ActiveBadge />
        </div>
      </div>
    </div>
  );
}

function PieChart({ label, full }: { label: string; full: boolean }) {
  return (
    <div className="relative shrink-0 size-[92px]">
      <div className="absolute flex inset-[6.52%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full">
            <div className="absolute inset-[-2.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
                <path d={svgE1.p1835f000} stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[6.52%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full">
            {full ? (
              <div className="absolute inset-[-2.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84.0001">
                  <path d={svgE1_1.p25e07580} stroke="url(#pie_full)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <defs>
                    <radialGradient cx="0" cy="0" gradientTransform="matrix(65 -66.4407 7.96225 221.571 11.7222 74.2034)" gradientUnits="userSpaceOnUse" id="pie_full" r="1">
                      <stop offset="0.153871" stopColor="#FF2947" />
                      <stop offset="0.695363" stopColor="#121E6C" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="absolute inset-[47.5%_-2.5%_-2.5%_-2.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 44">
                  <path d={svgE1.pd408e40} stroke="url(#pie_half)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                  <defs>
                    <radialGradient cx="0" cy="0" gradientTransform="matrix(65 -66.4407 7.96225 221.571 11.7222 34.2034)" gradientUnits="userSpaceOnUse" id="pie_half" r="1">
                      <stop offset="0.153871" stopColor="#FF2947" />
                      <stop offset="0.695363" stopColor="#121E6C" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal inset-[34.78%_18.48%] justify-center leading-[0] text-[#121e6c] text-[24px] text-center">
        <p className="leading-[28px]">{label}</p>
      </div>
    </div>
  );
}

// ─── Page 1: Home Payments ────────────────────────────────────────────────────

function HomePaymentsPage({ onProductosYServicios }: { onProductosYServicios: () => void }) {
  return (
    <div className="backdrop-blur-[1px] bg-[#f7f8fb] relative size-full" data-name="Pagos">
      {/* APP Header */}
      <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-0 pb-[12px] rounded-bl-[24px] rounded-br-[24px] top-0 w-full">
        <div className="shrink-0 w-full">
          <StatusBar />
        </div>
        {/* Menu */}
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[56px] items-center px-[16px] relative size-full">
              {/* Profile */}
              <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px py-[8px] relative">
                <div className="bg-[#121e6c] content-stretch drop-shadow-[0px_4px_6px_rgba(18,30,108,0.08)] flex items-center justify-center relative rounded-[100px] shrink-0 size-[40px]">
                  <div className="relative shrink-0 size-[20px]">
                    <div className="absolute inset-[4.17%_10.26%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8945 18.3333">
                        <path d={svgPagos.p3be4d9f0} fill="white" />
                        <path d={svgPagos.p1cd49800} fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                  <div className="content-stretch flex items-center relative shrink-0 w-full">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Semibold',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1e1e1e] text-[14px]">Vinos y vinilos</p>
                  </div>
                  <p className="[word-break:break-word] font-['Montserrat:Regular',sans-serif] font-normal leading-[16px] overflow-hidden relative shrink-0 text-[#606060] text-[12px] text-ellipsis w-full whitespace-nowrap">Calle 123 # 24 - 32, San Vicent</p>
                </div>
              </div>
              {/* Ayuda */}
              <div className="content-stretch flex items-center justify-center relative shrink-0">
                <div className="bg-white content-stretch drop-shadow-[0px_4px_6px_rgba(18,30,108,0.08)] flex gap-[8px] h-[32px] items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0">
                  <div className="[word-break:break-word] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">
                    <p className="leading-[20px]">Ayuda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="absolute left-0 top-[120px] bottom-[84px] w-full overflow-y-auto">
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[16px] pb-[16px]">
          {/* Herramientas para vender */}
          <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative rounded-[16px] shrink-0 w-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px]">Herramientas para vender</p>
            <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full">
              {/* Cobrar */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[4.17%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.3333 40.3333">
                        <path clipRule="evenodd" d={svgPagos.p22f20380} fill="#121E6C" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPagos.p22f20380} fill="url(#p1_cobrar_a)" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPagos.p22f20380} fill="url(#p1_cobrar_b)" fillRule="evenodd" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(21.5716 -16.9007 16.9007 24.0838 3.43676 37.0445)" gradientUnits="userSpaceOnUse" id="p1_cobrar_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(-14.6333 19.2074 -19.2074 -16.3374 39.6417 0.936393)" gradientUnits="userSpaceOnUse" id="p1_cobrar_b" r="1">
                            <stop offset="0.107248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Cobrar</p>
              </div>
              {/* Simular una venta */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[2.27%_20.72%_6.06%_20.45%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.8832 40.3333">
                        <path d={svgPagos.p16ff6d00} fill="#121E6C" />
                        <path d={svgPagos.p16ff6d00} fill="url(#p1_sim_a)" />
                        <path d={svgPagos.p16ff6d00} fill="url(#p1_sim_b)" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(13.8432 -16.9007 10.8457 24.0838 2.20548 37.0445)" gradientUnits="userSpaceOnUse" id="p1_sim_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(-9.39063 19.2074 -12.326 -16.3374 25.4393 0.936393)" gradientUnits="userSpaceOnUse" id="p1_sim_b" r="1">
                            <stop offset="0.107248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Simular una venta</p>
              </div>
              {/* Links de pago */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[4.17%_24.22%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.6875 40.3333">
                        <path clipRule="evenodd" d={svgPagos.p1bd7a280} fill="#121E6C" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPagos.p1bd7a280} fill="url(#p1_lnk_a)" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPagos.p2eeace00} fill="#121E6C" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPagos.p2eeace00} fill="url(#p1_lnk_b)" fillRule="evenodd" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(-3.78788 -16.8056 17.9865 4.36729 15.6776 40.3333)" gradientUnits="userSpaceOnUse" id="p1_lnk_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(9.33237 18.7034 -18.0368 0.984205 4.73485 1.44048)" gradientUnits="userSpaceOnUse" id="p1_lnk_b" r="1">
                            <stop offset="0.107248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Links de pago</p>
              </div>
              {/* QR Pro */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="-translate-y-1/2 absolute aspect-[53.00269317626953/15] left-[12.5%] right-[12.5%] top-[calc(50%+0.19px)]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 9.33915">
                        <path d={svgPagos.p2b2c5680} fill="#32005F" />
                        <path d={svgPagos.p1f7990c0} fill="#32005F" />
                        <path d={svgPagos.p3a153700} fill="#32005F" />
                        <path d={svgPagos.p19052300} fill="#32005F" />
                        <path d={svgPagos.p17f439c0} fill="#32005F" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">QR Pro</p>
              </div>
            </div>
          </div>

          {/* Gestión de tu negocio */}
          <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative rounded-[16px] shrink-0 w-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px]">Gestión de tu negocio</p>
            <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full">
              {/* Crédito */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative rounded-[100px] shrink-0 size-[44px]">
                    <div className="absolute inset-[17.92%_4.17%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.3333 28.2333">
                        <path clipRule="evenodd" d={svgPagos.pa600780} fill="#121E6C" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPagos.pa600780} fill="url(#p1_cred_a)" fillRule="evenodd" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(21.5716 -11.8305 16.9007 16.8587 3.43676 25.9312)" gradientUnits="userSpaceOnUse" id="p1_cred_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Crédito</p>
              </div>
              {/* Saldo de ventas */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[2.08%_12.03%_4.17%_12.03%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.4167 41.25">
                        <path clipRule="evenodd" d={svgPagos.p24407e00} fill="url(#p1_saldo_a)" fillRule="evenodd" />
                        <path d={svgPagos.p1df0bdf0} fill="url(#p1_saldo_b)" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(27.1511 -34.2585 34.3943 61.8568 4.06106 37.2299)" gradientUnits="userSpaceOnUse" id="p1_saldo_a" r="1">
                            <stop offset="0.153871" stopColor="#FF2947" /><stop offset="0.695363" stopColor="#121E6C" />
                          </radialGradient>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(27.1511 -34.2585 34.3943 61.8568 4.06106 37.2299)" gradientUnits="userSpaceOnUse" id="p1_saldo_b" r="1">
                            <stop offset="0.153871" stopColor="#FF2947" /><stop offset="0.695363" stopColor="#121E6C" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">
                  <p className="leading-[16px] mb-0">Saldo</p>
                  <p className="leading-[16px]">de ventas</p>
                </div>
              </div>
              {/* Historial de ventas */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[9.94%_9.09%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 35.2543">
                        <path d={svgPagos.p179ca00} fill="#121E6C" />
                        <path d={svgPagos.p179ca00} fill="url(#p1_hist_a)" />
                        <path d={svgPagos.pf3c05c0} fill="#121E6C" />
                        <path d={svgPagos.pf3c05c0} fill="url(#p1_hist_b)" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(19.254 -14.7725 15.0849 21.051 3.06752 32.3796)" gradientUnits="userSpaceOnUse" id="p1_hist_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(-0.303456 14.9802 -15.6941 -0.842144 22.625 2.62695)" gradientUnits="userSpaceOnUse" id="p1_hist_b" r="1">
                            <stop offset="0.107248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px] whitespace-pre-wrap">
                  <p className="leading-[16px] mb-0">Historial</p>
                  <p className="leading-[16px]">de ventas</p>
                </div>
              </div>
              {/* Datáfonos */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute bottom-[9.09%] left-1/4 right-[23.66%] top-[9.09%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5912 36">
                        <path d={svgPagos.p5804700} fill="#121E6C" />
                        <path d={svgPagos.p5804700} fill="url(#p1_dat_a)" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(12.0825 -15.0849 9.46629 21.4963 1.92497 33.0646)" gradientUnits="userSpaceOnUse" id="p1_dat_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Datáfonos</p>
              </div>
              {/* Empleados */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[9.09%_15.43%_9.09%_13.64%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.211 36">
                        <path d={svgPagos.p12fbc080} fill="#121E6C" />
                        <path d={svgPagos.p12fbc080} fill="url(#p1_emp_a)" />
                        <path d={svgPagos.pea8b280} fill="#121E6C" />
                        <path d={svgPagos.pea8b280} fill="url(#p1_emp_b)" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(16.6927 -15.0849 13.0782 21.4963 2.65946 33.0646)" gradientUnits="userSpaceOnUse" id="p1_emp_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(-3.5 14 -13.2497 -6.19096 20.625 0.5)" gradientUnits="userSpaceOnUse" id="p1_emp_b" r="1">
                            <stop offset="0.107248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Empleados</p>
              </div>
              {/* Caja registradora — INTERACTIVE (ex "Productos y servicios") */}
              <button
                onClick={onProductosYServicios}
                className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0 cursor-pointer"
              >
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[32px]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                      <g clipPath="url(#clip_cash_home)">
                        <path d={svgCashReg.p1b393980} fill="url(#grad_cash_home)" />
                      </g>
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="grad_cash_home" x1="32" x2="-7.98412e-07" y1="16" y2="16">
                          <stop offset="0.149063" stopColor="#FF2947" />
                          <stop offset="0.87985" stopColor="#121E6C" />
                        </linearGradient>
                        <clipPath id="clip_cash_home">
                          <rect fill="white" height="32" width="32" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0">
                  <div className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px] whitespace-pre-wrap">
                    <p className="leading-[16px] mb-0">Caja</p>
                    <p className="leading-[16px]">registradora</p>
                  </div>
                  <div className="bg-[#ee424e] content-stretch flex items-center justify-center px-[8px] relative rounded-[100px] shrink-0">
                    <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
                      <p className="leading-[16px]">Nuevo</p>
                    </div>
                  </div>
                </div>
              </button>
              {/* Métricas del negocio */}
              <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
                <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                  <div className="relative shrink-0 size-[44px]">
                    <div className="absolute inset-[4.17%_13.99%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.6905 40.3333">
                        <path d={svgPagos.p72e2380} fill="#121E6C" />
                        <path d={svgPagos.p72e2380} fill="url(#p1_met_a)" />
                        <defs>
                          <radialGradient cx="0" cy="0" gradientTransform="matrix(16.9491 -16.9007 13.2791 24.0838 2.70031 37.0445)" gradientUnits="userSpaceOnUse" id="p1_met_a" r="1">
                            <stop offset="0.147248" stopColor="#FF2947" /><stop offset="1" stopColor="#FF2947" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Métricas del negocio</p>
              </div>
            </div>
          </div>

          {/* Novedades */}
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px]">Novedades</p>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="h-[172px] relative rounded-[16px] shrink-0 w-full">
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px]">
                  <div className="absolute inset-0 rounded-[16px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(247,248,251,0.2) 0%, rgba(247,248,251,0.2) 100%), linear-gradient(103.24deg, rgba(8,14,255,0.08) 5.486%, rgba(156,155,151,0.04) 73.55%, rgba(8,14,255,0.16) 93.334%), linear-gradient(90deg, #fff 0%, #fff 100%)" }} />
                  <img alt="" className="absolute max-w-none object-cover rounded-[16px] size-full" src={imgCard} />
                  <div className="absolute inset-0 overflow-hidden rounded-[16px]">
                    <img alt="" className="absolute h-[179.03%] left-[38.63%] max-w-none top-[-61.09%] w-[89.51%]" src={imgCard1} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] h-[84px] items-start justify-center leading-[0] relative shrink-0 text-[#1e1e1e] w-[172px]">
                    <div className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[16px] w-full">
                      <p className="leading-[20px]">Gana $50.000 por cada referido</p>
                    </div>
                    <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] w-full">
                      <p className="leading-[16px]">Tu referido también recibe $10.000 al unirse.</p>
                    </div>
                  </div>
                  <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.6)] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[12px] shrink-0 w-[162px]">
                    <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">Referir ahora</p>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_30.2px_0px_rgba(18,30,108,0.2)]" />
              </div>
              {/* Carousel dots */}
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center overflow-clip p-[16px] relative shrink-0 w-[180px]">
                  {[true,false,false,false,false,false].map((active, i) => (
                    <div key={i} className="relative shrink-0 size-[8px]">
                      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" fill={active ? "#EE424E" : "#FCDFE2"} r="4" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute backdrop-blur-[1px] bottom-0 content-stretch flex flex-col items-center left-0 pb-[24px] pt-[20px] px-[20px] w-full"
        style={{ backgroundImage: "linear-gradient(0.500163deg, rgb(247,248,251) 50.064%, rgba(247,248,251,0) 98.508%)" }}>
        <div className="h-[62px] relative rounded-[100px] shrink-0 w-full">
          <div aria-hidden className="absolute backdrop-blur-[6px] inset-0 pointer-events-none rounded-[100px]"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(247,248,251,0.2) 0%, rgba(247,248,251,0.2) 100%), linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 100%)" }} />
          <div aria-hidden className="absolute border border-[rgba(210,212,225,0.5)] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_10px_18.7px_0px_rgba(18,30,108,0.09)]" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[42px] py-[8px] relative size-full">
              {/* Ventas */}
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-center min-w-px relative">
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute inset-[4.17%_20.79%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.021 22">
                      <path d={svgPagos.p206800} fill="#121E6C" />
                    </svg>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#121e6c] text-[11px] text-center whitespace-nowrap">Ventas</p>
              </div>
              {/* Cobrar CTA */}
              <div className="content-stretch flex h-full items-center justify-center relative shrink-0 w-[83.67px]">
                <div className="bg-[#ff2947] flex-[1_0_0] h-full min-w-px relative rounded-[100px]">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[12px] relative size-full">
                      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                        <p className="leading-[20px]">Cobrar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cuenta */}
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-center min-w-px relative">
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute inset-[8.72%_3.99%_8.71%_4%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.082 19.8165">
                      <path d={svgPagos.p1dc44880} fill="#121E6C" />
                      <path d={svgPagos.p3d534980} fill="#121E6C" />
                    </svg>
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#121e6c] text-[11px] text-center whitespace-nowrap">
                  <p className="leading-[16px]">Cuenta</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2px_4px_0px_white,inset_0px_3px_7.5px_0px_rgba(18,30,108,0.13)]" />
        </div>
      </div>
    </div>
  );
}

// ─── Page 2: Home Productos y servicios ──────────────────────────────────────

function HomeProductosPage({
  onBack,
  onCreateProduct,
  onTusProductos,
  onCobrar,
}: {
  onBack: () => void;
  onCreateProduct: () => void;
  onTusProductos: () => void;
  onCobrar: () => void;
}) {
  return (
    <div className="bg-[#f7f8fb] relative size-full">
      {/* Header */}
      <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 pb-[16px] top-0 w-full">
        <StatusBar dark />
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-between px-[12px] relative size-full">
              <BackButton onPress={onBack} />
              <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px relative self-stretch">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px] text-center">Caja registradora</p>
              </div>
              <div className="relative shrink-0 size-[24px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="absolute left-0 top-[76px] bottom-[96px] w-full overflow-y-auto">
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[16px] py-[12px]">

          {/* ① Bloque + — Crear producto o servicio */}
          <div className="bg-white relative rounded-[16px] shrink-0 w-full">
            <div className="flex flex-col items-center justify-center size-full">
              <button
                onClick={onCreateProduct}
                className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[4px] py-[16px] relative size-full cursor-pointer w-full"
              >
                <div className="relative shrink-0 size-[32px]">
                  <div className="absolute inset-[4.17%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.3333 29.3333">
                      <circle cx="14.6667" cy="14.6667" fill="#FF2947" r="14.6667" />
                    </svg>
                  </div>
                  <div className="absolute inset-[27.93%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1235 14.1235">
                      <path clipRule="evenodd" d={svgProds.p3ebeae00} fill="white" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-full">
                  <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[min-content] whitespace-pre-wrap">
                    <p className="leading-[16px] mb-0">Crear producto</p>
                    <p className="leading-[16px]">o servicio</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ② Bloque 1/2 — "Crea un producto o servicio" */}
          <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[343px]">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#1e1e1e] w-full">
                  <div className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] w-full">
                    <p className="leading-[20px]">Crea un producto o servicio</p>
                  </div>
                  <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] w-full">Cobra en segundos y visualiza los productos más vendidos</p>
                </div>
              </div>
              <PieChart label="1/2" full={false} />
            </div>
            <button
              onClick={onCreateProduct}
              className="bg-[#f1f2f6] relative rounded-[12px] shrink-0 w-full cursor-pointer"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative size-full">
                  <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">Crear producto o servicio</p>
                </div>
              </div>
            </button>
          </div>

          {/* ③ Gestiona tus productos — section heading */}
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#121e6c] text-[16px] w-full">
              <p className="leading-[24px]">Gestiona tus productos</p>
            </div>
          </div>

          {/* ③ Gestiona tus productos — tool-button grid, pixel perfect matching AtomToolButton8 pattern */}
          <div className="content-start flex gap-[8px] items-start relative shrink-0 w-full">

            {/* Tus productos — 64px card + 32px icon + linearGradient fill */}
            <button
              onClick={onTusProductos}
              className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0 cursor-pointer"
            >
              <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                <div className="relative shrink-0 size-[32px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="grad_tus_p2" x1="32" x2="0" y1="16" y2="16">
                        <stop offset="0.149063" stopColor="#FF2947" />
                        <stop offset="0.87985" stopColor="#121E6C" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#grad_tus_p2)" d="M16 4a6 6 0 0 0-6 6H7a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V13a3 3 0 0 0-3-3h-3a6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4h-8a4 4 0 0 1 4-4z" />
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0">
                <div className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">
                  <p className="leading-[16px] mb-0">Tus</p>
                  <p className="leading-[16px]">productos</p>
                </div>
              </div>
            </button>

            {/* Configuración — 64px card + 32px icon + linearGradient fill */}
            <div className="content-stretch flex flex-col gap-[8px] items-center min-w-[65px] pt-[2px] relative shrink-0">
              <div className="bg-white content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[16px] shrink-0 size-[64px]">
                <div className="relative shrink-0 size-[32px]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="grad_cfg_p2" x1="32" x2="0" y1="16" y2="16">
                        <stop offset="0.149063" stopColor="#FF2947" />
                        <stop offset="0.87985" stopColor="#121E6C" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#grad_cfg_p2)" d="M27 17.5a11 11 0 0 0 .1-1.5 11 11 0 0 0-.1-1.5l2.9-2.3-2.8-5-3.4 1.4a11 11 0 0 0-2.6-1.5L20.4 4h-5.6l-.6 3.1A11 11 0 0 0 11.6 8.6L8.2 7.2 5.4 12.2l2.9 2.3A11 11 0 0 0 8.2 16a11 11 0 0 0 .1 1.5L5.4 19.8l2.8 5 3.4-1.4a11 11 0 0 0 2.6 1.5L14.8 28h5.6l.6-3.1a11 11 0 0 0 2.6-1.5l3.4 1.4 2.8-5-2.9-2.3zM17.6 22a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0">
                <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[79.75px]">Configuración</p>
              </div>
            </div>

          </div>

          {/* ④ Métricas heading */}
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#121e6c] text-[16px] w-full">
              <p className="leading-[24px]">Métricas de tus productos y servicios</p>
            </div>
          </div>

          {/* ④ Metrics empty state */}
          <div className="content-stretch flex flex-col gap-[56px] items-center justify-center relative shrink-0 w-[343px]">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="col-1 content-stretch flex flex-col gap-[24px] h-[221.122px] items-center justify-center ml-0 mt-0 relative row-1 w-[283px]">
                <div className="relative shrink-0 size-[45px]">
                  <div className="absolute inset-[9.5%_4.5%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.9501 36.45">
                      <path clipRule="evenodd" d={svgProds.p5e5b500} fill="#6C759F" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgProds.p3833b980} fill="#6C759F" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgProds.p24d3d880} fill="#6C759F" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgProds.p369cfd80} fill="#6C759F" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgProds.p280b900} fill="#6C759F" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgProds.p39a98200} fill="#6C759F" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="col-1 content-stretch flex flex-col items-center justify-center ml-0 mt-0 relative row-1 w-[283px]">
                    <p className="[word-break:break-word] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e1e1e] text-[14px] text-center w-full">Cuando vendas tus productos, verás aquí todos los datos relacionados con ellos.</p>
                  </div>
                </div>
                <button
                  onClick={onCreateProduct}
                  className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#121e6c] text-[12px] text-center w-[173px] cursor-pointer"
                >
                  <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[16px] underline">Crear producto</p>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ⑤ Bottom CTA fijo */}
      <div className="absolute backdrop-blur-[1px] bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] py-[24px] w-full"
        style={{ backgroundImage: "linear-gradient(0.637538deg, rgb(247,248,251) 35.923%, rgba(247,248,251,0) 98.003%)" }}>
        <button
          onClick={onCobrar}
          className="bg-[#ff2947] h-[48px] relative rounded-[100px] shrink-0 w-full cursor-pointer"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[16px] items-center justify-center px-[16px] py-[12px] relative size-full">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                <p className="leading-[20px]">Cobrar con mis productos</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Page 3: Tus productos ────────────────────────────────────────────────────

function TusProductosPage({
  products,
  onBack,
  onCreateProduct,
  onContinueToCobro,
  onViewProduct,
}: {
  products: Product[];
  onBack: () => void;
  onCreateProduct: () => void;
  onContinueToCobro: () => void;
  onViewProduct: (p: Product) => void;
}) {
  const hasProducts = products.length > 0;
  return (
    <div className="bg-[#f7f8fb] relative size-full">
      {/* Header */}
      <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 pb-[16px] top-0 w-full">
        <StatusBar />
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-between px-[12px] relative size-full">
              <BackButton onPress={onBack} />
              <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px relative self-stretch">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px] text-center">Tus productos</p>
              </div>
              <div className="relative shrink-0 size-[24px]">
                <div className="absolute inset-[15.63%_14.06%_15.62%_17.19%]">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
                    <path clipRule="evenodd" d={svgE1.p25dc38a0} fill="#121E6C" fillRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center left-1/2 top-[96px]">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[343px]">
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative">
            <div className="bg-white h-[40px] relative rounded-[30px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-[16px] py-[12px] relative size-full">
                  <div className="overflow-clip relative shrink-0 size-[24px]">
                    <div className="absolute inset-[4.17%_8.33%_6.57%_8.33%]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21.4221">
                        <path clipRule="evenodd" d={svgE1.p2ea251f0} fill="#606060" fillRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-[1_0_0] min-w-px relative">
                    <div className="content-stretch flex items-start px-[4px] py-[8px] relative size-full">
                      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#606060] text-[14px] whitespace-nowrap">
                        <p className="leading-[20px]">Buscar ítem</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex h-[40px] items-center justify-center py-[12px] relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <div className="absolute inset-[16.67%_0_15.81%_0]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16.2048">
                  <path clipRule="evenodd" d={svgE1.p2ff2ec40} fill="#121E6C" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgE1.p33334580} fill="#121E6C" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgE1.p369c000} fill="#121E6C" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgE1.p259bc880} fill="#121E6C" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgE1.p2f036500} fill="#121E6C" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgE1.p3848dc00} fill="#121E6C" fillRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex items-center pl-[8px] relative rounded-[100px] shrink-0">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#121e6c] text-[12px] text-center whitespace-nowrap">
                <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[16px] underline">Filtrar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="absolute left-0 top-[152px] bottom-[88px] w-full overflow-y-auto">
        <div className="py-[12px]">
          <div className="flex flex-col items-center gap-[12px] px-[16px]">
            {/* Feedback card */}
            <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[343px]">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#1e1e1e] w-full">
                    <div className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] w-full">
                      <p className="leading-[20px]">{hasProducts ? "Cobra seleccionando tu producto" : "Crea un producto o servicio"}</p>
                    </div>
                    <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] w-full">Cobra en segundos y visualiza los productos más vendidos</p>
                  </div>
                </div>
                <PieChart label={hasProducts ? "2/2" : "1/2"} full={hasProducts} />
              </div>
              <button
                onClick={hasProducts ? onContinueToCobro : onCreateProduct}
                className="bg-[#f1f2f6] relative rounded-[12px] shrink-0 w-full cursor-pointer"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative size-full">
                    <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">
                      {hasProducts ? "Cobrar con mis productos" : "Crear producto o servicio"}
                    </p>
                  </div>
                </div>
              </button>
            </div>
            {products.map((p) => <ProductCard key={p.id} product={p} onClick={() => onViewProduct(p)} />)}
            <GhostProductCard name="Producto de ejemplo" price="$25.000" />
            <GhostProductCard name="Servicio de ejemplo" price="$50.000" />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute backdrop-blur-[1px] bottom-0 left-0 right-0 content-stretch flex flex-col items-center justify-center px-[16px] py-[20px]"
        style={{ backgroundImage: "linear-gradient(0.584414deg, rgb(247,248,251) 35.923%, rgba(247,248,251,0) 98.003%)" }}>
        <button onClick={onCreateProduct} className="bg-[#ff2947] h-[48px] relative rounded-[100px] shrink-0 w-full cursor-pointer">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[16px] items-center justify-center px-[16px] py-[12px] relative size-full">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                <p className="leading-[20px]">Crear producto o servicio</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Page 3 sub: Create product form ─────────────────────────────────────────

function CreateProductPage({
  formName, formPrice, formHasPhoto,
  onNameChange, onPriceChange, onHasPhotoChange,
  onSave, onBack, onClose,
  editMode = false,
}: {
  formName: string; formPrice: string; formHasPhoto: boolean;
  onNameChange: (v: string) => void; onPriceChange: (v: string) => void;
  onHasPhotoChange: (v: boolean) => void;
  onSave: (name: string, price: string, hasPhoto: boolean) => void;
  onBack: () => void; onClose: () => void;
  editMode?: boolean;
}) {
  const [includeTax, setIncludeTax] = useState(false);
  const isValid = formName.trim().length > 0 && formPrice.trim().length > 0;
  return (
    <div className="bg-[#f7f8fb] relative size-full">
      <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 pb-[16px] top-0 w-full">
        <StatusBar />
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-between px-[12px] relative size-full">
              <BackButton onPress={onBack} />
              <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px relative self-stretch">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px] text-center">
                  {editMode ? "Editar producto" : "Nuevo producto o servicio"}
                </p>
              </div>
              <CloseXButton onPress={onClose} />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable fields — stops above fixed button */}
      <div className="absolute left-[16px] right-[16px] top-[96px] bottom-[88px] overflow-y-auto">
        <div className="flex flex-col gap-[32px] items-center pb-[16px]">
          {/* Photo — tap to add the example sneaker photo */}
          <div className="bg-white content-stretch flex flex-col gap-[24px] items-center overflow-clip p-[16px] relative rounded-[16px] shrink-0 w-[343px]">
            {formHasPhoto ? (
              <div className="content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[79px]">
                <img alt="Zapatillas Nike SB" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgSneaker} />
              </div>
            ) : (
              <ShoppingBagIllustration size={79} />
            )}
            <button
              onClick={() => onHasPhotoChange(!formHasPhoto)}
              className="bg-[#f1f2f6] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[12px] shrink-0 w-[311px] cursor-pointer"
            >
              <p className="[word-break:break-word] font-['Montserrat:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">
                {formHasPhoto ? "Editar foto" : "Agregar foto"}
              </p>
            </button>
          </div>

          {/* Nombre * */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
              <p><span className="leading-[20px]">Nombre del producto o servicio </span><span className="leading-[20px] text-[#c31a2f]">*</span></p>
            </div>
            <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Ej. Zapatillas Nike SB"
                    className="flex-1 min-w-0 font-['Montserrat:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1e1e1e] outline-none bg-transparent placeholder:text-[#9a9a9a] placeholder:font-normal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Precio * */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
              <p className="leading-[20px]">Precio de venta (impuesto incluido) <span className="text-[#c31a2f]">*</span></p>
            </div>
            <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center pl-[12px] pr-[8px] py-[12px] relative size-full gap-[4px]">
                  <span className="font-['Montserrat:Medium',sans-serif] font-medium text-[14px] text-[#1e1e1e] leading-[20px] shrink-0">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formPrice}
                    onChange={(e) => onPriceChange(e.target.value)}
                    placeholder="0"
                    className="flex-1 min-w-0 font-['Montserrat:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1e1e1e] outline-none bg-transparent placeholder:text-[#9a9a9a] placeholder:font-normal"
                  />
                </div>
              </div>
            </div>
            <div className="h-[20px] relative shrink-0 w-full">
              <p className="[word-break:break-word] absolute font-['Montserrat:Regular',sans-serif] font-normal inset-[0_0_20%_0] leading-[16px] text-[#969696] text-[12px]">Ingresa el precio que pagará tu cliente.</p>
            </div>
          </div>

          {/* Categoría */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
              <p className="leading-[20px]">Categoría</p>
            </div>
            <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative size-full">
                  <div className="flex-[1_0_0] h-full min-w-px relative">
                    <div className="[word-break:break-word] absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] text-[#1e1e1e] text-[14px]">
                      <p className="leading-[20px]">General</p>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute bottom-[26.39%] left-[8.33%] right-[8.33%] top-1/4">
                      <ChevronSvg />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle impuesto — starts OFF, controls tax fields visibility */}
          <button
            onClick={() => setIncludeTax(!includeTax)}
            className="content-stretch flex gap-[59px] items-center justify-end shrink-0 w-full cursor-pointer"
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] min-w-px relative text-[#121e6c] text-[14px]">¿Producto incluye impuesto?</p>
            <div className="h-[28px] relative shrink-0 w-[52px]">
              {includeTax ? (
                /* ON: red track, circle on the right */
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 28">
                  <path d={svgCP.p9c7c300} fill="#FF2947" />
                  <path d={svgCP.p24e980} fill="white" />
                </svg>
              ) : (
                /* OFF: gray track, circle on the left */
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 28">
                  <path d={svgCP.p9c7c300} fill="#CBCED4" />
                  <path d="M26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2C20.6274 2 26 7.37258 26 14Z" fill="white" />
                </svg>
              )}
            </div>
          </button>

          {/* Impuesto * — visible only when toggle is ON */}
          {includeTax && (
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
                <p><span className="leading-[20px]">Impuesto </span><span className="leading-[20px] text-[#c31a2f]">*</span></p>
              </div>
              <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative size-full">
                    <div className="flex-[1_0_0] h-full min-w-px relative">
                      <div className="[word-break:break-word] absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] text-[#1e1e1e] text-[14px]">
                        <p className="leading-[20px]">IVA 5%</p>
                      </div>
                    </div>
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute bottom-[26.39%] left-[8.33%] right-[8.33%] top-1/4"><ChevronSvg /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtotal — visible only when toggle is ON */}
          {includeTax && (
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
                <p className="leading-[20px]">Subtotal sin impuestos</p>
              </div>
              <div className="bg-white h-[40px] opacity-50 relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-row items-center justify-end size-full">
                  <div className="content-stretch flex gap-[12px] items-center justify-end p-[12px] relative size-full">
                    <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal inset-0 justify-center leading-[0] text-[#606060] text-[14px]">
                      <p className="leading-[20px]">Se calcula automáticamente</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[20px] relative shrink-0 w-full">
                <p className="[word-break:break-word] absolute font-['Montserrat:Regular',sans-serif] font-normal inset-[0_0_20%_0] leading-[16px] text-[#969696] text-[12px]">Este valor se calcula según el precio y el impuesto.</p>
              </div>
            </div>
          )}

          {/* Unidad de medida * */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
              <p><span className="leading-[20px]">Unidad de medida </span><span className="leading-[20px] text-[#c31a2f]">*</span></p>
            </div>
            <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative size-full">
                  <div className="flex-[1_0_0] h-full min-w-px relative">
                    <div className="[word-break:break-word] absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] text-[#1e1e1e] text-[14px]">
                      <p className="leading-[20px]">Unidades</p>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute bottom-[26.39%] left-[8.33%] right-[8.33%] top-1/4"><ChevronSvg /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[20px] relative shrink-0 w-full">
              <p className="[word-break:break-word] absolute font-['Montserrat:Regular',sans-serif] font-normal inset-[0_0_20%_0] leading-[16px] text-[#969696] text-[12px]">Selecciona cómo se mide o vende este producto (ej. unidad, kilo, litro).</p>
            </div>
          </div>

          {/* Código */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[14px]">
              <p className="leading-[20px]">Código del producto</p>
            </div>
            <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full">
              <div className="flex flex-row items-center justify-end size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-end p-[12px] relative size-full">
                  <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal inset-0 justify-center leading-[0] text-[#606060] text-[14px]">
                    <p className="leading-[20px]">Ej. PROD01</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[20px] relative shrink-0 w-full">
              <p className="[word-break:break-word] absolute font-['Montserrat:Regular',sans-serif] font-normal inset-[0_0_20%_0] leading-[16px] text-[#969696] text-[12px]">Código único para identificar tu producto</p>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed action button — anchored at bottom, always visible */}
      <div
        className="absolute bottom-0 left-0 right-0 px-[16px] py-[20px] backdrop-blur-[1px]"
        style={{ backgroundImage: "linear-gradient(0deg, rgb(247,248,251) 40%, rgba(247,248,251,0) 100%)" }}
      >
        <button
          onClick={() => isValid && onSave(formName.trim(), formPrice.trim(), formHasPhoto)}
          className={`h-[48px] relative rounded-[100px] transition-colors w-full ${isValid ? "bg-[#ff2947] cursor-pointer" : "bg-[#ffb2bc] cursor-not-allowed"}`}
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[16px] items-center justify-center px-[25px] py-[12px] relative size-full">
              <div className={`[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center whitespace-nowrap ${isValid ? "text-white" : "text-[#ffdfe4]"}`}>
                <p className="leading-[20px]">{editMode ? "Guardar cambios" : "Crear producto"}</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Success bottom sheet ─────────────────────────────────────────────────────

function SuccessSheet({
  product, celebrate = false, onContinue, onCreateAnother,
}: {
  product: Product; celebrate?: boolean; onContinue: () => void; onCreateAnother: () => void;
}) {
  const displayPrice = product.price.startsWith("$") ? product.price : "$" + product.price;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Confeti: se dispara una sola vez al aparecer el modal del primer producto.
  // Se limpia al cerrar (unmount) para no dejar el efecto corriendo.
  useEffect(() => {
    if (!celebrate || !canvasRef.current) return;
    const fire = confetti.create(canvasRef.current, { resize: true, useWorker: true });
    const timer = window.setTimeout(() => {
      fire({ particleCount: 140, spread: 80, startVelocity: 42, origin: { y: 0.45 }, ticks: 220 });
    }, 150);
    return () => {
      window.clearTimeout(timer);
      fire.reset();
    };
  }, [celebrate]);

  return (
    <div className="absolute inset-0 bg-[rgba(30,30,30,0.7)] flex flex-col items-center justify-end overflow-clip">
      {celebrate && <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none size-full z-10" />}
      <div className="bg-white drop-shadow-[0px_-4px_4px_rgba(0,0,0,0.12)] relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full">
        <div className="flex flex-col items-center justify-end size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-end pb-[20px] pt-[12px] px-[16px] relative size-full">
            <div className="content-stretch flex gap-[20px] items-center py-[12px] relative shrink-0 w-full">
              <div className="relative shrink-0 size-[24px]" />
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#121e6c] text-[16px] text-center">
                <p className="leading-[20px]">¡Creaste tu primer producto!</p>
              </div>
              <div className="relative shrink-0 size-[24px]" />
            </div>
            <p className="[word-break:break-word] font-['Montserrat:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e1e1e] text-[14px] text-center w-full">Ahora podrás seleccionarlo desde el cobro para vender de forma más ágil.</p>
            <div className="bg-[#f7f8fb] content-stretch flex flex-col gap-[16px] items-center overflow-clip p-[16px] relative rounded-[16px] shrink-0 w-[343px]">
              {product.hasPhoto ? (
                <div className="content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[112px]">
                  <img alt={product.name} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgSneaker} />
                </div>
              ) : (
                <ShoppingBagIllustration size={112} />
              )}
              <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full">
                <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-full">
                  <p className="leading-[16px]">{product.name}</p>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-[24px] text-center whitespace-nowrap">
                  <p className="leading-[28px]">{displayPrice}</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-center justify-end pt-[8px] relative shrink-0 w-full">
              <button onClick={onContinue} className="bg-[#ff2947] flex-[1_0_0] h-[48px] min-w-px relative rounded-[100px] cursor-pointer w-full">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[16px] items-center justify-center px-[25px] py-[12px] relative size-full">
                    <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                      <p className="leading-[20px]">Continuar</p>
                    </div>
                  </div>
                </div>
              </button>
              <button onClick={onCreateAnother} className="content-stretch flex gap-[8px] items-center justify-center py-[12px] relative shrink-0 w-full cursor-pointer">
                <div className="[word-break:break-word] flex flex-col font-['Montserrat:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ff2947] text-[12px] text-center whitespace-nowrap">
                  <p className="[text-underline-position:from-font] decoration-from-font decoration-solid leading-[16px] underline">Crear otro producto o servicio</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page 4: Flujo de cobro ───────────────────────────────────────────────────

function CobroPage({
  products, onBack,
}: {
  products: Product[]; onBack: () => void;
}) {
  return (
    <div className="bg-[#f7f8fb] relative size-full">
      <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 pb-[16px] top-0 w-full">
        <StatusBar dark />
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-between px-[12px] relative size-full">
              <BackButton onPress={onBack} />
              <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px relative self-stretch">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px] text-center">Caja registradora</p>
              </div>
              <div className="relative shrink-0 size-[24px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-[76px] bottom-[96px] w-full overflow-y-auto">
        <div className="py-[12px]">
          <div className="content-stretch flex flex-col gap-[24px] items-center px-[16px]">
            <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[343px]">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#1e1e1e] w-full">
                    <div className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] w-full">
                      <p className="leading-[20px]">Cobra seleccionando tu producto</p>
                    </div>
                    <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] w-full">Cobra en segundos y visualiza los productos más vendidos</p>
                  </div>
                </div>
                <PieChart label="2/2" full={true} />
              </div>
              <div className="bg-[#f1f2f6] relative rounded-[12px] shrink-0 w-full">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative size-full">
                    <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">Cobrar con mis productos</p>
                  </div>
                </div>
              </div>
            </div>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
            <GhostProductCard name="Producto de ejemplo" price="$25.000" />
            <GhostProductCard name="Servicio de ejemplo" price="$50.000" />
          </div>
        </div>
      </div>

      <div className="absolute backdrop-blur-[1px] bottom-0 left-0 right-0 content-stretch flex flex-col items-center justify-center px-[16px] py-[24px]"
        style={{ backgroundImage: "linear-gradient(0.637538deg, rgb(247,248,251) 35.923%, rgba(247,248,251,0) 98.003%)" }}>
        <button className="bg-[#ff2947] h-[48px] relative rounded-[100px] shrink-0 w-full cursor-pointer">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[16px] items-center justify-center px-[16px] py-[12px] relative size-full">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                <p className="leading-[20px]">Cobrar con mis productos</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Page: Product Detail ─────────────────────────────────────────────────────

function ProductDetailPage({
  product,
  onBack,
  onEdit,
  onClose,
}: {
  product: Product;
  onBack: () => void;
  onEdit: () => void;
  onClose: () => void;
}) {
  const displayPrice = product.price.startsWith("$") ? product.price : "$" + product.price;

  return (
    <div className="bg-[#f7f8fb] relative size-full">
      {/* Header */}
      <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-0 pb-[16px] top-0 w-full">
        <StatusBar />
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-between px-[12px] relative size-full">
              <BackButton onPress={onBack} />
              <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px relative self-stretch">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Bold',sans-serif] font-bold leading-[20px] min-w-px relative text-[#121e6c] text-[16px] text-center">Detalle del producto</p>
              </div>
              <CloseXButton onPress={onClose} />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="absolute left-[16px] right-[16px] top-[96px] bottom-0 overflow-y-auto">
        <div className="flex flex-col gap-[24px] items-center pb-[32px]">

          {/* InfoGeneral card */}
          <div className="bg-white content-stretch flex flex-col gap-[24px] items-center overflow-clip p-[16px] relative rounded-[16px] shrink-0 w-[343px]">
            {/* Product image */}
            {product.hasPhoto ? (
              <div className="content-stretch flex items-center justify-center p-[24px] relative rounded-[16px] shrink-0 size-[112px]">
                <img alt={product.name} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgSneaker} />
              </div>
            ) : (
              <ShoppingBagIllustration size={112} />
            )}
            {/* Details: name + price */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] text-center w-[311px]">
                <p className="leading-[16px]">{product.name}</p>
              </div>
              <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
                <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-[24px] text-center whitespace-nowrap">
                  <p className="leading-[28px]">{displayPrice}</p>
                </div>
              </div>
            </div>
            {/* Heart badge */}
            <div className="absolute backdrop-blur-[2px] bg-[#fff2f4] content-stretch flex items-center p-[4px] right-[16px] rounded-[8px] top-[16px]">
              <div className="relative shrink-0 size-[24px]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <path d={svgPV.p39393500} fill="#FF2947" />
                </svg>
              </div>
            </div>
            {/* Eliminar / Editar */}
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
              {/* Eliminar */}
              <div className="bg-[#f1f2f6] flex-[1_0_0] h-[40px] min-w-px relative rounded-[12px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative size-full">
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute inset-[4.44%_9.46%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.46 21.87">
                          <path clipRule="evenodd" d={svgPV.p288a3180} fill="#121E6C" fillRule="evenodd" />
                          <path clipRule="evenodd" d={svgPV.p3fd74800} fill="#121E6C" fillRule="evenodd" />
                          <path clipRule="evenodd" d={svgPV.p3420f340} fill="#121E6C" fillRule="evenodd" />
                          <path clipRule="evenodd" d={svgPV.p10d46d00} fill="#121E6C" fillRule="evenodd" />
                          <path clipRule="evenodd" d={svgPV.p2fb24200} fill="#121E6C" fillRule="evenodd" />
                          <path clipRule="evenodd" d={svgPV.p15ffbc80} fill="#121E6C" fillRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Montserrat:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">Eliminar</p>
                  </div>
                </div>
              </div>
              {/* Editar */}
              <button
                onClick={onEdit}
                className="bg-[#f1f2f6] flex-[1_0_0] h-[40px] min-w-px relative rounded-[12px] cursor-pointer"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative size-full">
                    <div className="relative shrink-0 size-[24px]">
                      <div className="absolute inset-[4.17%_4.17%_4.19%_4.17%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21.9948">
                          <path d={svgPV.p26ae3500} fill="#121E6C" />
                          <path d={svgPV.p276e25f0} fill="#121E6C" />
                        </svg>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Montserrat:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#121e6c] text-[14px] text-center whitespace-nowrap">Editar</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-white content-stretch flex gap-[96px] items-center px-[16px] py-[12px] relative rounded-[16px] shrink-0 w-[343px]">
            <div className="bg-[#f4fdf9] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[12px] relative rounded-[100px] shrink-0">
              <div className="relative shrink-0 size-[24px]">
                <div className="absolute inset-1/4">
                  <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" fill="#6CDCAB" r="6" />
                  </svg>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1b8959] text-[14px] text-center whitespace-nowrap">
                <p className="leading-[20px]">Producto activo</p>
              </div>
            </div>
            <div className="h-[28px] relative shrink-0 w-[52px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 28">
                <path d={svgCP.p9c7c300} fill="#FF2947" />
                <path d={svgCP.p24e980} fill="white" />
              </svg>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white content-stretch flex flex-col gap-[20px] items-start pb-[16px] pt-[20px] px-[16px] relative rounded-[16px] shrink-0 w-[343px]">
            {/* Más información heading */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute inset-[4.29%_14.06%]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.25 21.94">
                      <path clipRule="evenodd" d={svgPV.p8bb1070} fill="#121E6C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPV.p2d013e00} fill="#121E6C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPV.p17e54280} fill="#121E6C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPV.p4b3c800} fill="#121E6C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPV.p23dc2680} fill="#121E6C" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-w-px relative">
                  <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[#1e1e1e] text-[14px] w-full">
                    <p className="leading-[20px]">Más información</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-0.25px_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311.5 0.5">
                  <path d="M0.25 0.25H311.25" stroke="#D2D4E1" strokeLinecap="round" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
            {/* Category / Unit / Code */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              {[
                { label: "Categoría", value: "General" },
                { label: "Unidad de medida", value: "Unidades" },
                { label: "Código del producto", value: "PROD01" },
              ].map(({ label, value }) => (
                <div key={label} className="[word-break:break-word] content-stretch flex items-start leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] w-full">
                  <div className="flex flex-[1_0_0] flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center min-w-px relative">
                    <p className="leading-[16px]">{label}</p>
                  </div>
                  <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-right whitespace-nowrap">
                    <p className="leading-[16px]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-0.25px_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311.5 0.5">
                  <path d="M0.25 0.25H311.25" stroke="#D2D4E1" strokeLinecap="round" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
            {/* Tax breakdown */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="[word-break:break-word] content-stretch flex items-start leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] w-full">
                <div className="flex flex-[1_0_0] flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center min-w-px relative">
                  <p className="leading-[16px]">Impuesto (5%)</p>
                </div>
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-right whitespace-nowrap">
                  <p className="leading-[16px]">$26.619,05</p>
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex items-start leading-[0] relative shrink-0 text-[#1e1e1e] text-[12px] w-full">
                <div className="flex flex-[1_0_0] flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center min-w-px relative">
                  <p className="leading-[16px]">Subtotal</p>
                </div>
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-right whitespace-nowrap">
                  <p className="leading-[16px]">$532.380,95</p>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full">
                <div className="flex flex-[1_0_0] flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center min-w-px relative text-[12px]">
                  <p className="leading-[16px]">Precio de venta total</p>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] text-right whitespace-nowrap">
                  <p className="leading-[20px]">{displayPrice}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("home-payments");
  const [products, setProducts] = useState<Product[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [celebrateFirst, setCelebrateFirst] = useState(false);
  const [lastCreated, setLastCreated] = useState<Product | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formHasPhoto, setFormHasPhoto] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleSave = (name: string, price: string, hasPhoto: boolean) => {
    if (editingProductId) {
      setProducts((prev) => prev.map((p) =>
        p.id === editingProductId ? { ...p, name, price, hasPhoto } : p
      ));
      const updated = { id: editingProductId, name, price, hasPhoto };
      setSelectedProduct(updated);
      setEditingProductId(null);
      setScreen("product-detail");
    } else {
      const isFirstProduct = products.length === 0;
      const product: Product = { id: Date.now().toString(), name, price, hasPhoto };
      setProducts((prev) => [...prev, product]);
      setLastCreated(product);
      setCelebrateFirst(isFirstProduct);
      setShowSuccess(true);
    }
  };

  const goToCreate = () => {
    setFormName("");
    setFormPrice("");
    setFormHasPhoto(false);
    setEditingProductId(null);
    setShowSuccess(false);
    setScreen("create-product");
  };

  const goToEdit = (product: Product) => {
    setFormName(product.name);
    setFormPrice(product.price);
    setFormHasPhoto(product.hasPhoto || false);
    setEditingProductId(product.id);
    setShowSuccess(false);
    setScreen("create-product");
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setScreen("product-detail");
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{
          top: 'env(safe-area-inset-top, 0px)',
          bottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {screen === "home-payments" && (
          <HomePaymentsPage
            onProductosYServicios={() => setScreen("home-productos")}
          />
        )}
        {screen === "home-productos" && (
          <HomeProductosPage
            onBack={() => setScreen("home-payments")}
            onCreateProduct={goToCreate}
            onTusProductos={() => setScreen("tus-productos")}
            onCobrar={() => setScreen("cobro")}
          />
        )}
        {screen === "tus-productos" && (
          <TusProductosPage
            products={products}
            onBack={() => setScreen("home-productos")}
            onCreateProduct={goToCreate}
            onContinueToCobro={() => setScreen("cobro")}
            onViewProduct={viewProduct}
          />
        )}
        {screen === "create-product" && (
          <>
            <CreateProductPage
              formName={formName}
              formPrice={formPrice}
              formHasPhoto={formHasPhoto}
              onNameChange={setFormName}
              onPriceChange={setFormPrice}
              onHasPhotoChange={setFormHasPhoto}
              onSave={handleSave}
              editMode={!!editingProductId}
              onBack={() => editingProductId ? setScreen("product-detail") : setScreen("tus-productos")}
              onClose={() => editingProductId ? setScreen("product-detail") : setScreen("tus-productos")}
            />
            {showSuccess && lastCreated && (
              <SuccessSheet
                product={lastCreated}
                celebrate={celebrateFirst}
                onContinue={() => { setShowSuccess(false); setCelebrateFirst(false); setScreen("tus-productos"); }}
                onCreateAnother={() => { setShowSuccess(false); setCelebrateFirst(false); setFormName(""); setFormPrice(""); setFormHasPhoto(false); }}
              />
            )}
          </>
        )}
        {screen === "product-detail" && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setScreen("tus-productos")}
            onEdit={() => goToEdit(selectedProduct)}
            onClose={() => setScreen("tus-productos")}
          />
        )}
        {screen === "cobro" && (
          <CobroPage
            products={products}
            onBack={() => setScreen("tus-productos")}
          />
        )}
      </div>
    </div>
  );
}


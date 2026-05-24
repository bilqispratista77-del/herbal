'use client'

import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CartDrawer() {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    navigateTo,
  } = useStore()

  const total = getCartTotal()

  return (
    <Sheet open={cartDrawerOpen} onOpenChange={setCartDrawerOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Keranjang ({cart.length} item)
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-herbal-lighter">
              <ShoppingCart className="h-10 w-10 text-herbal/40" />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Keranjang Anda kosong</p>
              <p className="mt-1 text-sm text-gray-500">
                Temukan produk herbal yang tepat untuk Anda
              </p>
            </div>
            <Button
              className="mt-2 bg-herbal hover:bg-herbal-dark"
              onClick={() => {
                setCartDrawerOpen(false)
                navigateTo('shop')
              }}
            >
              Belanja Sekarang
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4">
              <div className="flex flex-col gap-4 pb-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 rounded-lg border bg-white p-3"
                  >
                    {/* Thumbnail */}
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-herbal-lighter">
                      <img
                        src={item.product.image || `https://placehold.co/80x80/D8F3DC/2D6A4F?text=${encodeURIComponent(item.product.name.slice(0, 8))}`}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="line-clamp-2 text-sm font-medium text-gray-800">
                          {item.product.name}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-herbal">
                          {formatRupiah(item.product.price)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t bg-gray-50">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-gray-600">Total</span>
                <span className="text-lg font-bold text-herbal-dark">
                  {formatRupiah(total)}
                </span>
              </div>
              <Separator />
              <SheetFooter className="gap-2 p-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setCartDrawerOpen(false)
                    navigateTo('cart')
                  }}
                >
                  Lihat Keranjang
                </Button>
                <Button
                  className="w-full bg-herbal hover:bg-herbal-dark"
                  onClick={() => {
                    setCartDrawerOpen(false)
                    navigateTo('checkout')
                  }}
                >
                  Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

import {Image} from '@shopify/hydrogen';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {useState} from 'react';
import type {ProductVariantFragment} from 'storefrontapi.generated';

type GalleryImage = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

type ProductImageProps = {
  selectedVariantImage: ProductVariantFragment['image'];
  images: GalleryImage[];
};

const ProductImage = ({selectedVariantImage, images}: ProductImageProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>(0);

  const [touchStart, setTouchStart] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const allImages = selectedVariantImage
    ? [
        selectedVariantImage,
        ...images.filter((img) => img.id !== selectedVariantImage.id),
      ]
    : images;

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    const offset = currentTouch - touchStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const minSwipeDistance = 50;

    if (Math.abs(dragOffset) > minSwipeDistance) {
      if (dragOffset > 0 && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
        if (modalOpen) setModalIndex((prev) => prev - 1);
      } else if (dragOffset < 0 && selectedIndex < allImages.length - 1) {
        setSelectedIndex((prev) => prev + 1);
        if (modalOpen) setModalIndex((prev) => prev + 1);
      }
    }
  };

  const getImagePosition = (index: number) => {
    const baseTransform = isDragging ? dragOffset : 0;
    const diff = index - (modalOpen ? modalIndex : selectedIndex);
    return `translate3d(calc(${diff * 100}% + ${baseTransform}px), 0, 0)`;
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  if (allImages.length < 1) {
    return (
      <div className="aspect-square bg-brand-cream rounded-lg animate-pulse" />
    );
  }

  return (
    <>
      {/* Image Carousel */}
      <div className="space-y-4">
        {/* Main Image Container */}
        <div
          className="aspect-square relative rounded-lg overflow-hidden bg-brand-cream cursor-zoom-in"
          onClick={() => !isDragging && openModal(selectedIndex)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image Container */}
          {/* Image Container */}
          <div className="absolute inset-0">
            {allImages.map((image, index) => (
              <div
                key={`image-${image.id || index}`}
                className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-out ${
                  isDragging ? '' : 'transition-transform duration-300 ease-out'
                }`}
                style={{transform: getImagePosition(index)}}
              >
                <Image
                  alt={image.altText || 'Product Image'}
                  data={image}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="absolute inset-0 hidden md:flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIndex > 0) {
                  setSelectedIndex((prev) => prev - 1);
                }
              }}
              className="bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors "
              disabled={selectedIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-brand-navy" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIndex < allImages.length - 1) {
                  setSelectedIndex((prev) => prev + 1);
                }
              }}
              className="bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              disabled={selectedIndex === allImages.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-brand-navy" />
            </button>
          </div>
        </div>
        {/* Thumbnail Strip */}
        <div className="hidden md:grid grid-cols-[repeat(auto-fill,_5rem)] gap-4 py-2 px-1">
          {allImages.map((image, index) => (
            <button
              key={`thumbnail-${index}-${image.id || 'x'}`}
              className={`relative aspect-square w-20 rounded-md overflow-hidden transition-all duration-300 ease-out ${
                selectedIndex === index
                  ? 'ring-2 ring-brand-gold ring-offset-2'
                  : 'hover:ring-2 hover:ring-brand-navy/10 hover:ring-offset-2 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                alt={image.altText || 'Product Thumbnail'}
                data={image}
                sizes="80px"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex md:hidden justify-center space-x-2 mt-4">
          {allImages.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? 'bg-brand-gold w-4'
                  : 'bg-brand-navy/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal / Popup */}
      {modalOpen && (
        <div className="w-full h-full fixed top-0 left-0 my-0 inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="absolute inset-0 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-50">
              <p className="text-white/80 font-source text-sm">
                {modalIndex + 1} / {allImages.length}
              </p>
            </div>

            {/* Modal Image */}
            <div
              className="w-full h-full flex items-center justify-center p-0 md:p-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full h-full">
                {allImages.map((image, index) => (
                  <div
                    key={`modal-image-${image.id || 'x'}-${index}`}
                    className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-out ${
                      !isDragging
                        ? 'transition-transform duration-300'
                        : 'transition-none'
                    }`}
                    style={{transform: getImagePosition(index)}}
                  >
                    <div className=" relative w-full h-full flex items-center justify-center">
                      <Image
                        alt={image.altText || 'Product Image'}
                        data={image}
                        sizes="90vw"
                        className="max-w-full max-h-[85vh] object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Navigation Arrows */}
            <div className="absolute inset-0 hidden md:flex items-center justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (modalIndex > 0) {
                    setModalIndex((prev) => prev - 1);
                  }
                }}
                className="bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                disabled={modalIndex === 0}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (modalIndex < allImages.length - 1) {
                    setModalIndex((prev) => prev + 1);
                  }
                }}
                className="bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                disabled={modalIndex === allImages.length - 1}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImage;

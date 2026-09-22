import { useState, useMemo, useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ImageUploader from "./ImageUploader";
import { categories } from "../../utils/mockCategories";
import axios from "axios";
import { useParams } from "react-router";

const statusOptions = ["pending", "active", "inactive"];
const sectionOptions = ["none","deals", "feature", "new"];
const discountTypes = ["none", "percentage", "flat"];

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel = "Save Product",
}) {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      let data = await axios.get("http://localhost:5000/getcategory");
      setCategories(data.data.categories);
      console.log(data.data.categories);
    }
    fetchCategories();
  }, []);
  
  
  const [form, setForm] = useState({
    title: initialData?.title || "",
    // sku: initialData?.sku || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    price: initialData?.price ?? "",
    stock: initialData?.stock ?? "",
    category: initialData?.category || "",
    brand: initialData?.brand || "",
    additionalInformation: initialData?.additionalInfo || "",
    status: initialData?.status || "pending",
    tag: initialData?.tag?.join(", ") || "",
    discountType: initialData?.discountType || "none",
    discount: initialData?.discount || "",
    discountStartDate: initialData?.discountStartDate || "",
    discountEndDate: initialData?.discountEndDate || "",
    images: initialData?.images || "",
    isMain: initialData?.isMain,
    section: initialData?.section,
  });
  let [isMainIndex, setIsMainIndex] = useState();


  useEffect(()=>{
    initialData?.images.map((item,index)=>{
    if(item.isMain == true){
      setIsMainIndex(index)
    }
  })
  },[])

  const [images, setImages] = useState(
    initialData?.images?.map((img) => ({ url: img.url, isMain: img.isMain })) ||
      [],
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  let [deleteImage, setDelete] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.files);
    setForm({
      ...form,
      [e.target.name]:
        e.target.name == "images" ? e.target.files : e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Live-calculated sale price preview — mirrors what the backend would compute
  const salePricePreview = useMemo(() => {
    const price = Number(form.price) || 0;
    const value = Number(form.discount) || 0;
    if (form.discountType === "percentage")
      return Math.max(0, price - (price * value) / 100);
    if (form.discountType === "flat") return Math.max(0, price - value);
    return price;
  }, [form.price, form.discountType, form.discount]);

  const validate = () => {
    console.log(Boolean(isMainIndex))
    const errs = {};
    if (!form.title.trim()) errs.title = "Product title is required";
    // if (!form.sku.trim()) errs.sku = "SKU is required";
    if (!form.price || Number(form.price) <= 0)
      errs.price = "Enter a valid price";
    if (form.stock === "" || Number(form.stock) < 0)
      errs.stock = "Enter a valid stock quantity";
    if (!form.description.trim()) errs.description = "Description is required";
    // if (images.length === 0) errs.images = "At least one image is required";
    if (
      form.discountType !== "none" &&
      (!form.discount || Number(form.discount) <= 0)
    ) {
      errs.discount = "Enter a discount value";
    }
   
    return errs;
  };
  let params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    console.log(images);
    const formData = new FormData(e.currentTarget);
    console.log(deleteImage);
    if (params.id) {
      console.log("update");
      let data = await axios.put(
        `http://localhost:5000/update-product/${params.id}`,
        formData,
      );
    } else {
      console.log("hello");
      let data = await axios.post(
        "http://localhost:5000/createproduct",
        formData,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-5">
          Product Images{" "}
        </h2>
        <ImageUploader
          images={images}
          onChange={setImages}
          handleChange={handleChange}
          setIsMainIndex={setIsMainIndex}
          setDelete={setDelete}
          deleteImage={deleteImage}
        />
        <input
          hidden
          type="string"
          multiple
          onChange={handleChange}
          name="isMain"
          value={isMainIndex}
        />
        <input
          hidden
          type="string"
          onChange={handleChange}
          name="deleteImage"
          value={deleteImage}
        />
        {errors.images && (
          <p className="text-xs text-red-500 mt-2">{errors.images}</p>
        )}
      </div>

      <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-5">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <InputField
              label="Product title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="e.g. Wireless Headphones"
            />
          </div>

          <InputField
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="e.g. SoundCore"
          />

          <div>
            <label className="text-sm font-medium text-ink block mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm
                focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-1.5">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm capitalize
                focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </div>
           <div>
            <label className="text-sm font-medium text-ink block mb-1.5">
              Section
            </label>
            <select
              name="section"
              value={form.section}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm capitalize
                focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
            >
              {sectionOptions.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        

        <div className="mt-4">
          <label className="text-sm font-medium text-ink block mb-1.5">
            Short description
          </label>
          <input
            type="text"
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="One-line summary shown on product cards"
            className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm placeholder:text-slate/40
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-ink block mb-1.5">
            Full description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the product..."
            className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm placeholder:text-slate/40 resize-none
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all
              ${errors.description ? "border-red-400" : "border-ink/15"}`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-ink block mb-1.5">
            Additional information
          </label>
          <textarea
            name="additionalInformation"
            value={form.additionalInformation}
            onChange={handleChange}
            rows={2}
            placeholder="Specs, care instructions, etc."
            className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm placeholder:text-slate/40 resize-none
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
          />
        </div>

        <div className="mt-4">
          <InputField
            label="Tags (comma separated)"
            name="tag"
            value={form.tag}
            onChange={handleChange}
            placeholder="e.g. audio, wireless, noise-cancelling"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-5">
          Pricing & Stock
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Price (৳)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={errors.price}
            placeholder="0.00"
          />
          <InputField
            label="Stock quantity"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            error={errors.stock}
            placeholder="0"
          />
        </div>

        <div className="mt-5 pt-5 border-t border-ink/10">
          <p className="text-sm font-medium text-ink mb-3">Discount</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-ink block mb-1.5">
                Type
              </label>
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm capitalize
                  focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
              >
                {discountTypes.map((t) => (
                  <option key={t} value={t} className="capitalize">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {form.discountType !== "none" && (
              <>
                <InputField
                  label={
                    form.discountType === "percentage"
                      ? "Discount (%)"
                      : "Discount (৳)"
                  }
                  name="discount"
                  type="number"
                  value={form.discount}
                  onChange={handleChange}
                  // error={errors.discount}?
                  placeholder="0"
                />
                <div className="flex flex-col justify-end">
                  <label className="text-sm font-medium text-ink block mb-1.5">
                    Sale price preview
                  </label>
                  <div className="px-3.5 py-2.5 rounded-lg bg-amber/10 text-sm font-semibold text-ink">
                    ৳{salePricePreview.toLocaleString()}
                  </div>
                </div>
              </>
            )}
          </div>

          {form.discountType !== "none" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Discount start date"
                name="discountStartDate"
                type="date"
                value={form.discountStartDate}
                onChange={handleChange}
              />
              <InputField
                label="Discount end date"
                name="discountEndDate"
                type="date"
                value={form.discountEndDate}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={saving} className="w-auto px-6">
          {submitLabel} asd
        </Button>
      </div>
    </form>
  );
}

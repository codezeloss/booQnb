"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { onClickRentModalClose } from "@/redux/modalSlice";
import Modal from "@/components/ui/modal";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/ui/heading";
import { categories } from "@/components/navbar/Categories";
import CategoryInput from "@/components/ui/category-input";
import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";
import Counter from "@/components/Counter";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import { DollarSignIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

// !! Form Schema
const formSchema = z.object({
  category: z
    .string({
      required_error: "Category is required",
    })
    .min(2),
  location: z
    .string({
      required_error: "Location is required",
    })
    .min(2),
  guestCount: z
    .number({
      required_error: "Quest count is required",
    })
    .min(1),
  roomCount: z
    .number({
      required_error: "Room count is required",
    })
    .min(1),
  bathroomCount: z
    .number({
      required_error: "Bathroom count is required",
    })
    .min(1),
  imageSrc: z.any({
    required_error: "Image is required",
  }),
  price: z.coerce
    .number({
      required_error: "Price is required",
    })
    .min(1),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(2),
});

// !! Interface
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal({ isOpen, onClose }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAll, getByValue } = useCountries();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  // ** Handle Back/Next buttons
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  //const secondaryActionLabel = useMemo(() => {
  //  if (step === STEPS.CATEGORY) {
  //    return undefined;
  //  }
  // }, [step]);

  // **

  // ** Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      location: "",
      imageSrc: "",
      description: "",
      guestCount: 0,
      roomCount: 0,
      bathroomCount: 0,
      price: 0,
    },
  });

  const category = form.watch("category");
  const location = form.watch("location");
  const guestCount = form.watch("guestCount");
  const roomCount = form.watch("roomCount");
  const bathroomCount = form.watch("bathroomCount");
  const imageSrc = form.watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  // ** Handle Form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/listings`, values);

      if (response.data) {
        form.reset();
        dispatch(onClickRentModalClose());
        toast({
          description: "Listing created successfully!",
        });
        setStep(STEPS.CATEGORY);
        router.refresh();
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Cannot list your home, please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // !! BODY CONTENT ----------------------------
  let bodyContent = (
    <div>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <Heading
              title="Which of these describes your place?"
              subtitle="Pick a category"
            />

            <FormControl>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item, index) => (
                  <div key={index} className="col-span-1">
                    <CategoryInput
                      icon={item.icon}
                      label={item.label}
                      onClick={() => form.setValue("category", item.label)}
                      selected={category === item.label}
                    />
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <Heading
                title="Where is your place located?"
                subtitle="Help guests find you!"
              />

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getAll().map((item, index) => (
                    <SelectItem
                      key={index}
                      className="w-full flex items-center cursor-pointer "
                      value={item.value}
                    >
                      <span className="mr-2">{item.flag}</span> {item.label},{" "}
                      <span className="text-muted-foreground">
                        {item.region}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
                <Map center={getByValue(location)?.latlng} />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div>
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <div>
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="roomCount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="bathroomCount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div>
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => form.setValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div>
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Input id="title" placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div>
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormControl>
                <div className="flex items-center gap-x-1">
                  <DollarSignIcon size={18} />
                  <Input
                    id="price"
                    type="number"
                    placeholder="150"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  // !! ---------------------------------------------

  // ** Hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="">
      <Modal
        title="BooQnb your Home!"
        description=""
        isOpen={isOpen}
        onClose={onClose}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {bodyContent}

            <div className="flex items-center gap-x-2 pt-2">
              {step > 0 && (
                <Button
                  variant="secondary"
                  className="w-full font-bold"
                  disabled={isLoading}
                  type="button"
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
              {actionLabel === "Next" && (
                <Button
                  variant="default"
                  className="w-full font-bold"
                  disabled={isLoading}
                  type="button"
                  onClick={onNext}
                >
                  Next
                </Button>
              )}
              {actionLabel === "Create" && (
                <Button
                  variant="default"
                  className="w-full font-bold"
                  disabled={isLoading}
                  type="submit"
                >
                  Create
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Modal>
      {step === 3 && (
        <div
          className={`absolute top-24 z-50 right-28 ${
            step === 3 ? "flex" : "hidden"
          }`}
        >
          <ImageUpload
            value={imageSrc}
            onChange={(value) => form.setValue("imageSrc", value)}
          />
        </div>
      )}
    </div>
  );
}

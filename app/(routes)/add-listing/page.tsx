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
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
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
import Container from "@/components/Container";

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

export default function AddListingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { getAll, getByValue } = useCountries();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    () => dynamic(() => import("@/components/Map"), { ssr: false }),
    []
  );

  // ** Handle Form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/listings`, values);

      if (response.data) {
        form.reset();
        router.push("/");
        router.refresh();
        toast({
          description: "Listing created successfully!",
        });
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

  // ** Hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Container>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full mb-11 space-y-8 md:space-y-11"
        >
          <h1 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mt-2">
            BooQnb your Home
          </h1>

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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-full overflow-y-auto">
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

          <hr />

          <div>
            {location !== "" && <Map center={getByValue(location)?.latlng} />}
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <Heading
                  title="Where is your place located?"
                  subtitle="Help guests find you!"
                />

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="w-full"
                    onClick={() => form.resetField("location")}
                  >
                    {getAll().map((item, index) => (
                      <SelectItem
                        key={index}
                        className="w-full flex items-center cursor-pointer"
                        value={item.value}
                      >
                        <span className="mr-2">{item.flag}</span> {item.label},{" "}
                        <span className="text-muted-foreground">
                          {item.region}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr />

          <div>
            <Heading
              title="Share some basics about your place"
              subtitle="What amenities do you have?"
            />

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

          <hr />

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

          <hr />

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

          <hr />

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

          <Button
            variant="default"
            className="w-full font-bold"
            disabled={isLoading}
            type="submit"
            size="lg"
          >
            Create
          </Button>
        </form>
      </Form>
    </Container>
  );
}

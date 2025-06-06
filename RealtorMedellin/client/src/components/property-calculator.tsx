import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertPropertyValuationSchema } from "@shared/schema";
import { Calculator, MapPin, Home, Bed, Bath, Calendar, CheckCircle } from "lucide-react";
import { ZONES } from "@/lib/constants";

const formSchema = insertPropertyValuationSchema.extend({
  contactName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  contactEmail: z.string().email("Ingresa un email válido"),
  contactPhone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
  propertyAddress: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  propertyArea: z.number().min(20, "El área debe ser de al menos 20 m²"),
  bedrooms: z.number().min(0, "Número de habitaciones inválido"),
  bathrooms: z.number().min(1, "Debe tener al menos 1 baño"),
  propertyAge: z.number().min(0, "La antigüedad debe ser un número positivo"),
});

type FormData = z.infer<typeof formSchema>;

interface PropertyCalculatorProps {
  onCalculationComplete?: (value: number) => void;
}

export default function PropertyCalculator({ onCalculationComplete }: PropertyCalculatorProps) {
  const { toast } = useToast();
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      propertyAddress: "",
      propertyZone: "",
      propertyArea: 0,
      bedrooms: 2,
      bathrooms: 1,
      propertyAge: 0,
      propertyCondition: "good",
      hasParking: false,
      hasElevator: false,
      hasBalcony: false,
    },
  });

  const estimateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/property-estimate", data);
      return response.json();
    },
    onSuccess: (data) => {
      setEstimatedValue(data.estimatedValue);
      setShowResult(true);
      onCalculationComplete?.(data.estimatedValue);
      toast({
        title: "¡Valuación completada!",
        description: "Hemos calculado el valor estimado de tu propiedad.",
      });
    },
    onError: () => {
      toast({
        title: "Error en la valuación",
        description: "Por favor, verifica los datos e intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const saveValuationMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/property-valuation", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Valuación guardada!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      form.reset();
      setShowResult(false);
      setEstimatedValue(null);
    },
    onError: () => {
      toast({
        title: "Error al guardar",
        description: "Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const onEstimate = (data: FormData) => {
    estimateMutation.mutate(data);
  };

  const onSaveValuation = () => {
    const formData = form.getValues();
    saveValuationMutation.mutate(formData);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString('es-CO')}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Calculadora de Valor de Propiedad
        </CardTitle>
        <p className="text-muted-foreground">
          Obtén una estimación gratuita e instantánea del valor de tu propiedad en Medellín
        </p>
      </CardHeader>
      
      <CardContent>
        {!showResult ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEstimate)} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Información de contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="300 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Property Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Información de la propiedad</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Dirección
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Carrera 43A #5A-113" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="propertyZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zona</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona la zona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ZONES.map((zone) => (
                              <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          Área (m²)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="85" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Bed className="h-4 w-4" />
                          Habitaciones
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Bath className="h-4 w-4" />
                          Baños
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="propertyAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Antigüedad (años)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="propertyCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado de la propiedad</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excelente</SelectItem>
                          <SelectItem value="good">Bueno</SelectItem>
                          <SelectItem value="fair">Regular</SelectItem>
                          <SelectItem value="poor">Necesita reparaciones</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Features */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Características adicionales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="hasParking"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Parqueadero</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasElevator"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Ascensor</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasBalcony"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Balcón</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={estimateMutation.isPending}
              >
                {estimateMutation.isPending ? (
                  "Calculando..."
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Valor de Propiedad
                  </>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">¡Valuación Completada!</h3>
              <p className="text-muted-foreground mb-6">
                Basado en los datos proporcionados, el valor estimado de tu propiedad es:
              </p>
              <div className="text-4xl font-bold text-primary mb-6">
                {estimatedValue && formatPrice(estimatedValue)}
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Esta es una estimación preliminar. Para una valuación más precisa, nuestros expertos pueden visitarte sin costo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onSaveValuation}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={saveValuationMutation.isPending}
                >
                  {saveValuationMutation.isPending ? "Guardando..." : "Solicitar Visita Gratuita"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowResult(false);
                    setEstimatedValue(null);
                    form.reset();
                  }}
                >
                  Nueva Valuación
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}